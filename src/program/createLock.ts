import {
  address,
  generateKeyPairSigner,
  getAddressEncoder,
  getProgramDerivedAddress,
  getUtf8Encoder,
  type IInstruction,
  type TransactionSendingSigner,
} from "@solana/web3.js";
import { install } from "@solana/webcrypto-ed25519-polyfill";
import {
  findAssociatedTokenPda,
  getCreateAssociatedTokenIdempotentInstruction,
  getSyncNativeInstruction,
} from "@solana-program/token";
import { getTransferSolInstruction } from "@solana-program/system";

import {
  LOCKER_PROGRAM_ADDRESS,
  getCreateVestingEscrowMetadataInstruction,
  getCreateVestingEscrowV2Instruction,
} from "../lib";
import { signAndSendTransactions } from "../rpc/client";
import {
  TOKEN_2022_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  WRAPPED_SOL_ID,
} from "../rpc/addresses";
import {
  ESCROW_METADATA_PDA_SEED,
  ESCROW_PDA_SEED,
  EVENT_AUTHORITY_PDA_SEED,
} from "./constants";
import { getCancelModeValue, getUpdateRecipientModeValue } from "./modes";
import { parseUnits } from "../utils/number";

export async function createLock({
  signer,
  form,
  mintAddr,
  version,
  decimals,
}: {
  signer: TransactionSendingSigner;
  form: LockSchema;
  mintAddr: string;
  version: "spl" | "token-2022";
  decimals: number;
}) {
  console.log({ form });
  if (!form.vestingPeriodAmount || !form.lockAmount) {
    console.error("createLock: missing required value: ", {
      vestingPeriodAmount: form.vestingPeriodAmount,
      lockAmount: form.lockAmount,
    });
    throw new Error("Create lock failed: missing required amount values");
  }

  const mint = address(mintAddr);

  // Install ED25519 webcrypto polyfill
  install();
  // Generate ephemeral keypair for escrow program
  const ephemeralSigner = await generateKeyPairSigner();

  const instructions: IInstruction[] = [];

  const tokenProgram =
    version === "token-2022"
      ? address(TOKEN_2022_PROGRAM_ID)
      : address(TOKEN_PROGRAM_ID);
  // Create user ATA
  const [userAta] = await findAssociatedTokenPda({
    mint,
    owner: signer.address,
    tokenProgram,
  });
  const createUserAta = getCreateAssociatedTokenIdempotentInstruction({
    mint,
    owner: signer.address,
    ata: userAta,
    payer: signer,
    tokenProgram,
  });
  instructions.push(createUserAta);

  // Create escrow ATA
  const [escrow] = await getProgramDerivedAddress({
    seeds: [
      getUtf8Encoder().encode(ESCROW_PDA_SEED),
      getAddressEncoder().encode(ephemeralSigner.address),
    ],
    programAddress: LOCKER_PROGRAM_ADDRESS,
  });

  const [escrowAta] = await findAssociatedTokenPda({
    mint,
    owner: escrow,
    tokenProgram,
  });

  const createEscrowAta = getCreateAssociatedTokenIdempotentInstruction({
    mint,
    owner: escrow,
    ata: escrowAta,
    payer: signer,
    tokenProgram,
  });
  instructions.push(createEscrowAta);

  // Generate escrow inputs from form data
  const recipient = address(form.recipientInfos[0].address);

  const startTimeDate = new Date(form.vestingStartDate);
  const startTime = BigInt(Math.floor(startTimeDate.getTime() / 1000));

  // Cliff values
  const cliffSeconds = form.cliff
    ? form.cliff.cliffPeriodAmount *
      getSecondsFromDurationUnit(form.cliff.cliffPeriodDurationUnit)
    : 0;
  const cliffTime = startTime + BigInt(cliffSeconds);
  const cliffAmount = form.cliff ? form.cliff.cliffAmount : 0;

  // Vesting period = total duration - cliff duration
  const vestingPeriodSeconds =
    form.vestingPeriodAmount *
      getSecondsFromDurationUnit(form.vestingPeriodDurationUnit) -
    cliffSeconds;

  // Lock amount = total - cliff
  const lockAmount = form.lockAmount - cliffAmount;
  const amountPerSecond = lockAmount / vestingPeriodSeconds;

  const unlockRateSeconds = getSecondsFromDurationUnit(
    form.unlockRateDurationUnit,
  );
  const amountPerPeriod = amountPerSecond * unlockRateSeconds;
  const numPeriods = Math.floor(lockAmount / amountPerPeriod);

  // Update recipient mode
  const updateRecipientModeValue = getUpdateRecipientModeValue(
    form.updateRecipientMode,
  );

  // Cancel mode
  const cancelModeValue = getCancelModeValue(form.cancelMode);

  // Transfer SOL to userATA if lock token is SOL
  if (mint === WRAPPED_SOL_ID) {
    const createTransferSol = getTransferSolInstruction({
      source: signer,
      amount: lockAmount,
      destination: userAta,
    });
    instructions.push(createTransferSol);

    const createSyncNativeSol = getSyncNativeInstruction({
      account: userAta,
    });
    instructions.push(createSyncNativeSol);
  }

  const [eventAuthority] = await getProgramDerivedAddress({
    seeds: [getUtf8Encoder().encode(EVENT_AUTHORITY_PDA_SEED)],
    programAddress: LOCKER_PROGRAM_ADDRESS,
  });

  // Create escrow
  const createVestingEscrowV2 = getCreateVestingEscrowV2Instruction({
    base: ephemeralSigner,
    escrow,
    tokenProgram,
    program: LOCKER_PROGRAM_ADDRESS,
    sender: signer,
    recipient: recipient,
    escrowToken: escrowAta,
    senderToken: userAta,
    params: {
      updateRecipientMode: updateRecipientModeValue,
      cancelMode: cancelModeValue,
      frequency: unlockRateSeconds,
      cliffUnlockAmount: parseUnits(cliffAmount.toString(), decimals),
      cliffTime: cliffTime,
      vestingStartTime: startTime,
      amountPerPeriod: parseUnits(amountPerPeriod.toString(), decimals),
      numberOfPeriod: numPeriods,
    },
    tokenMint: mint,
    eventAuthority,
    remainingAccountsInfo: { slices: [] },
  });
  instructions.push(createVestingEscrowV2);

  // Create escrow metadata
  const [escrowMetadata] = await getProgramDerivedAddress({
    seeds: [
      getUtf8Encoder().encode(ESCROW_METADATA_PDA_SEED),
      getAddressEncoder().encode(escrow),
    ],
    programAddress: LOCKER_PROGRAM_ADDRESS,
  });

  const createEscrowMetadata = getCreateVestingEscrowMetadataInstruction({
    name: form.title,
    escrow,
    escrowMetadata,
    payer: signer,
    creator: signer,
    description: `${form.title} description`,
    // Left empty for now
    creatorEmail: "",
    recipientEmail: "",
  });
  instructions.push(createEscrowMetadata);

  const signature = await signAndSendTransactions({
    signer,
    instructions,
    estimateCompute: true,
  });
  return signature;
}
