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
import * as v from "valibot";

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
import {
  CancelMode,
  getCancelModeValue,
  getUpdateRecipientModeValue,
  UpdateRecipientMode,
} from "./modes";
import { parseUnits } from "../utils/number";

function FormNumberSchema(msg: string) {
  return v.pipe(v.string(msg), v.transform(parseInt), v.nonNullish(v.number()));
}

export const LockSchema = v.object({
  title: v.string("Lock title is required."),
  token: v.object({
    address: v.string("Token address is required."),
    amount: FormNumberSchema("Token amount is required."),
  }),
  recipient: v.pipe(v.string("Recipient address is required.")),
  startDate: v.string("Lock start date is required."),
  duration: FormNumberSchema("Vesting duration is required."),
  cliff: v.optional(
    v.object({
      duration: v.optional(
        FormNumberSchema("Cliff duration must be non-zero."),
      ),
      amount: v.optional(FormNumberSchema("Cliff amount must be non-zero.")),
    }),
  ),
  unlockRate: FormNumberSchema("Unlock rate is required."),
  cancelMode: v.enum(CancelMode, "Cancel mode is required."),
  updateRecipientMode: v.enum(
    UpdateRecipientMode,
    "Update recipient mode is required.",
  ),
});
export type LockSchema = v.InferInput<typeof LockSchema>;

export async function createLock({
  signer,
  form,
  version,
  decimals,
}: {
  signer: TransactionSendingSigner;
  form: LockSchema;
  version: "spl" | "token-2022";
  decimals: number;
}) {
  console.log({ form });
  if (!form.duration || !form.token.amount) {
    console.error("createLock: missing required value: ", {
      vestingPeriodAmount: form.duration,
      lockAmount: form.token.amount,
    });
    throw new Error("Create lock failed: missing required amount values");
  }

  const mint = address(form.token.address);

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
  const recipient = address(form.recipient);

  const startTimeDate = form.startDate;
  const startTime = BigInt(
    Math.floor(new Date(startTimeDate).getTime() / 1000),
  );

  // Cliff values
  const cliffSeconds = form.cliff?.duration
    ? Number(form.cliff.duration) * 60
    : 0;
  const cliffTime = startTime + BigInt(cliffSeconds);
  const cliffAmount = form.cliff?.amount ? Number(form.cliff.amount) : 0;

  // Vesting period = total duration - cliff duration
  const vestingPeriodSeconds = Number(form.duration) * 60 - cliffSeconds;

  // Lock amount = total - cliff
  const lockAmount = Number(form.token.amount) - cliffAmount;
  const amountPerSecond = lockAmount / vestingPeriodSeconds;

  // const unlockRateSeconds = getSecondsFromDurationUnit(
  //   form.unlockRateDurationUnit,
  // );
  const unlockRateSeconds = Number(form.unlockRate) * 60;
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
