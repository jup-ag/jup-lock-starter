/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  fixDecoderSize,
  fixEncoderSize,
  getAddressEncoder,
  getBytesDecoder,
  getBytesEncoder,
  getOptionDecoder,
  getOptionEncoder,
  getProgramDerivedAddress,
  getStructDecoder,
  getStructEncoder,
  transformEncoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
  type IAccountMeta,
  type IAccountSignerMeta,
  type IInstruction,
  type IInstructionWithAccounts,
  type IInstructionWithData,
  type Option,
  type OptionOrNullable,
  type ReadonlyAccount,
  type ReadonlyUint8Array,
  type TransactionSigner,
  type WritableAccount,
  type WritableSignerAccount,
} from '@solana/web3.js';
import { LOCKER_PROGRAM_ADDRESS } from '../programs';
import {
  expectAddress,
  getAccountMetaFactory,
  type ResolvedAccount,
} from '../shared';
import {
  getCreateVestingEscrowParametersDecoder,
  getCreateVestingEscrowParametersEncoder,
  getRemainingAccountsInfoDecoder,
  getRemainingAccountsInfoEncoder,
  type CreateVestingEscrowParameters,
  type CreateVestingEscrowParametersArgs,
  type RemainingAccountsInfo,
  type RemainingAccountsInfoArgs,
} from '../types';

export const CREATE_VESTING_ESCROW_V2_DISCRIMINATOR = new Uint8Array([
  181, 155, 104, 183, 182, 128, 35, 47,
]);

export function getCreateVestingEscrowV2DiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(
    CREATE_VESTING_ESCROW_V2_DISCRIMINATOR
  );
}

export type CreateVestingEscrowV2Instruction<
  TProgram extends string = typeof LOCKER_PROGRAM_ADDRESS,
  TAccountBase extends string | IAccountMeta<string> = string,
  TAccountEscrow extends string | IAccountMeta<string> = string,
  TAccountTokenMint extends string | IAccountMeta<string> = string,
  TAccountEscrowToken extends string | IAccountMeta<string> = string,
  TAccountSender extends string | IAccountMeta<string> = string,
  TAccountSenderToken extends string | IAccountMeta<string> = string,
  TAccountRecipient extends string | IAccountMeta<string> = string,
  TAccountTokenProgram extends
    | string
    | IAccountMeta<string> = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TAccountEventAuthority extends string | IAccountMeta<string> = string,
  TAccountProgram extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountBase extends string
        ? WritableSignerAccount<TAccountBase> & IAccountSignerMeta<TAccountBase>
        : TAccountBase,
      TAccountEscrow extends string
        ? WritableAccount<TAccountEscrow>
        : TAccountEscrow,
      TAccountTokenMint extends string
        ? ReadonlyAccount<TAccountTokenMint>
        : TAccountTokenMint,
      TAccountEscrowToken extends string
        ? WritableAccount<TAccountEscrowToken>
        : TAccountEscrowToken,
      TAccountSender extends string
        ? WritableSignerAccount<TAccountSender> &
            IAccountSignerMeta<TAccountSender>
        : TAccountSender,
      TAccountSenderToken extends string
        ? WritableAccount<TAccountSenderToken>
        : TAccountSenderToken,
      TAccountRecipient extends string
        ? ReadonlyAccount<TAccountRecipient>
        : TAccountRecipient,
      TAccountTokenProgram extends string
        ? ReadonlyAccount<TAccountTokenProgram>
        : TAccountTokenProgram,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      TAccountEventAuthority extends string
        ? ReadonlyAccount<TAccountEventAuthority>
        : TAccountEventAuthority,
      TAccountProgram extends string
        ? ReadonlyAccount<TAccountProgram>
        : TAccountProgram,
      ...TRemainingAccounts,
    ]
  >;

export type CreateVestingEscrowV2InstructionData = {
  discriminator: ReadonlyUint8Array;
  params: CreateVestingEscrowParameters;
  remainingAccountsInfo: Option<RemainingAccountsInfo>;
};

export type CreateVestingEscrowV2InstructionDataArgs = {
  params: CreateVestingEscrowParametersArgs;
  remainingAccountsInfo: OptionOrNullable<RemainingAccountsInfoArgs>;
};

export function getCreateVestingEscrowV2InstructionDataEncoder(): Encoder<CreateVestingEscrowV2InstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['params', getCreateVestingEscrowParametersEncoder()],
      [
        'remainingAccountsInfo',
        getOptionEncoder(getRemainingAccountsInfoEncoder()),
      ],
    ]),
    (value) => ({
      ...value,
      discriminator: CREATE_VESTING_ESCROW_V2_DISCRIMINATOR,
    })
  );
}

export function getCreateVestingEscrowV2InstructionDataDecoder(): Decoder<CreateVestingEscrowV2InstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['params', getCreateVestingEscrowParametersDecoder()],
    [
      'remainingAccountsInfo',
      getOptionDecoder(getRemainingAccountsInfoDecoder()),
    ],
  ]);
}

export function getCreateVestingEscrowV2InstructionDataCodec(): Codec<
  CreateVestingEscrowV2InstructionDataArgs,
  CreateVestingEscrowV2InstructionData
> {
  return combineCodec(
    getCreateVestingEscrowV2InstructionDataEncoder(),
    getCreateVestingEscrowV2InstructionDataDecoder()
  );
}

export type CreateVestingEscrowV2AsyncInput<
  TAccountBase extends string = string,
  TAccountEscrow extends string = string,
  TAccountTokenMint extends string = string,
  TAccountEscrowToken extends string = string,
  TAccountSender extends string = string,
  TAccountSenderToken extends string = string,
  TAccountRecipient extends string = string,
  TAccountTokenProgram extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountEventAuthority extends string = string,
  TAccountProgram extends string = string,
> = {
  /** Base. */
  base: TransactionSigner<TAccountBase>;
  /** Escrow. */
  escrow?: Address<TAccountEscrow>;
  tokenMint: Address<TAccountTokenMint>;
  /** Escrow Token Account. */
  escrowToken?: Address<TAccountEscrowToken>;
  /** Sender. */
  sender: TransactionSigner<TAccountSender>;
  /** Sender Token Account. */
  senderToken: Address<TAccountSenderToken>;
  recipient: Address<TAccountRecipient>;
  /** Token program. */
  tokenProgram?: Address<TAccountTokenProgram>;
  /** system program. */
  systemProgram?: Address<TAccountSystemProgram>;
  eventAuthority?: Address<TAccountEventAuthority>;
  program: Address<TAccountProgram>;
  params: CreateVestingEscrowV2InstructionDataArgs['params'];
  remainingAccountsInfo: CreateVestingEscrowV2InstructionDataArgs['remainingAccountsInfo'];
};

export async function getCreateVestingEscrowV2InstructionAsync<
  TAccountBase extends string,
  TAccountEscrow extends string,
  TAccountTokenMint extends string,
  TAccountEscrowToken extends string,
  TAccountSender extends string,
  TAccountSenderToken extends string,
  TAccountRecipient extends string,
  TAccountTokenProgram extends string,
  TAccountSystemProgram extends string,
  TAccountEventAuthority extends string,
  TAccountProgram extends string,
  TProgramAddress extends Address = typeof LOCKER_PROGRAM_ADDRESS,
>(
  input: CreateVestingEscrowV2AsyncInput<
    TAccountBase,
    TAccountEscrow,
    TAccountTokenMint,
    TAccountEscrowToken,
    TAccountSender,
    TAccountSenderToken,
    TAccountRecipient,
    TAccountTokenProgram,
    TAccountSystemProgram,
    TAccountEventAuthority,
    TAccountProgram
  >,
  config?: { programAddress?: TProgramAddress }
): Promise<
  CreateVestingEscrowV2Instruction<
    TProgramAddress,
    TAccountBase,
    TAccountEscrow,
    TAccountTokenMint,
    TAccountEscrowToken,
    TAccountSender,
    TAccountSenderToken,
    TAccountRecipient,
    TAccountTokenProgram,
    TAccountSystemProgram,
    TAccountEventAuthority,
    TAccountProgram
  >
> {
  // Program address.
  const programAddress = config?.programAddress ?? LOCKER_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    base: { value: input.base ?? null, isWritable: true },
    escrow: { value: input.escrow ?? null, isWritable: true },
    tokenMint: { value: input.tokenMint ?? null, isWritable: false },
    escrowToken: { value: input.escrowToken ?? null, isWritable: true },
    sender: { value: input.sender ?? null, isWritable: true },
    senderToken: { value: input.senderToken ?? null, isWritable: true },
    recipient: { value: input.recipient ?? null, isWritable: false },
    tokenProgram: { value: input.tokenProgram ?? null, isWritable: false },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
    eventAuthority: { value: input.eventAuthority ?? null, isWritable: false },
    program: { value: input.program ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  // Resolve default values.
  if (!accounts.escrow.value) {
    accounts.escrow.value = await getProgramDerivedAddress({
      programAddress,
      seeds: [
        getBytesEncoder().encode(new Uint8Array([101, 115, 99, 114, 111, 119])),
        getAddressEncoder().encode(expectAddress(accounts.base.value)),
      ],
    });
  }
  if (!accounts.tokenProgram.value) {
    accounts.tokenProgram.value =
      'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' as Address<'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'>;
  }
  if (!accounts.escrowToken.value) {
    accounts.escrowToken.value = await getProgramDerivedAddress({
      programAddress:
        'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL' as Address<'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'>,
      seeds: [
        getAddressEncoder().encode(expectAddress(accounts.escrow.value)),
        getAddressEncoder().encode(expectAddress(accounts.tokenProgram.value)),
        getAddressEncoder().encode(expectAddress(accounts.tokenMint.value)),
      ],
    });
  }
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }
  if (!accounts.eventAuthority.value) {
    accounts.eventAuthority.value = await getProgramDerivedAddress({
      programAddress,
      seeds: [
        getBytesEncoder().encode(
          new Uint8Array([
            95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111, 114,
            105, 116, 121,
          ])
        ),
      ],
    });
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.base),
      getAccountMeta(accounts.escrow),
      getAccountMeta(accounts.tokenMint),
      getAccountMeta(accounts.escrowToken),
      getAccountMeta(accounts.sender),
      getAccountMeta(accounts.senderToken),
      getAccountMeta(accounts.recipient),
      getAccountMeta(accounts.tokenProgram),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.eventAuthority),
      getAccountMeta(accounts.program),
    ],
    programAddress,
    data: getCreateVestingEscrowV2InstructionDataEncoder().encode(
      args as CreateVestingEscrowV2InstructionDataArgs
    ),
  } as CreateVestingEscrowV2Instruction<
    TProgramAddress,
    TAccountBase,
    TAccountEscrow,
    TAccountTokenMint,
    TAccountEscrowToken,
    TAccountSender,
    TAccountSenderToken,
    TAccountRecipient,
    TAccountTokenProgram,
    TAccountSystemProgram,
    TAccountEventAuthority,
    TAccountProgram
  >;

  return instruction;
}

export type CreateVestingEscrowV2Input<
  TAccountBase extends string = string,
  TAccountEscrow extends string = string,
  TAccountTokenMint extends string = string,
  TAccountEscrowToken extends string = string,
  TAccountSender extends string = string,
  TAccountSenderToken extends string = string,
  TAccountRecipient extends string = string,
  TAccountTokenProgram extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountEventAuthority extends string = string,
  TAccountProgram extends string = string,
> = {
  /** Base. */
  base: TransactionSigner<TAccountBase>;
  /** Escrow. */
  escrow: Address<TAccountEscrow>;
  tokenMint: Address<TAccountTokenMint>;
  /** Escrow Token Account. */
  escrowToken: Address<TAccountEscrowToken>;
  /** Sender. */
  sender: TransactionSigner<TAccountSender>;
  /** Sender Token Account. */
  senderToken: Address<TAccountSenderToken>;
  recipient: Address<TAccountRecipient>;
  /** Token program. */
  tokenProgram?: Address<TAccountTokenProgram>;
  /** system program. */
  systemProgram?: Address<TAccountSystemProgram>;
  eventAuthority: Address<TAccountEventAuthority>;
  program: Address<TAccountProgram>;
  params: CreateVestingEscrowV2InstructionDataArgs['params'];
  remainingAccountsInfo: CreateVestingEscrowV2InstructionDataArgs['remainingAccountsInfo'];
};

export function getCreateVestingEscrowV2Instruction<
  TAccountBase extends string,
  TAccountEscrow extends string,
  TAccountTokenMint extends string,
  TAccountEscrowToken extends string,
  TAccountSender extends string,
  TAccountSenderToken extends string,
  TAccountRecipient extends string,
  TAccountTokenProgram extends string,
  TAccountSystemProgram extends string,
  TAccountEventAuthority extends string,
  TAccountProgram extends string,
  TProgramAddress extends Address = typeof LOCKER_PROGRAM_ADDRESS,
>(
  input: CreateVestingEscrowV2Input<
    TAccountBase,
    TAccountEscrow,
    TAccountTokenMint,
    TAccountEscrowToken,
    TAccountSender,
    TAccountSenderToken,
    TAccountRecipient,
    TAccountTokenProgram,
    TAccountSystemProgram,
    TAccountEventAuthority,
    TAccountProgram
  >,
  config?: { programAddress?: TProgramAddress }
): CreateVestingEscrowV2Instruction<
  TProgramAddress,
  TAccountBase,
  TAccountEscrow,
  TAccountTokenMint,
  TAccountEscrowToken,
  TAccountSender,
  TAccountSenderToken,
  TAccountRecipient,
  TAccountTokenProgram,
  TAccountSystemProgram,
  TAccountEventAuthority,
  TAccountProgram
> {
  // Program address.
  const programAddress = config?.programAddress ?? LOCKER_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    base: { value: input.base ?? null, isWritable: true },
    escrow: { value: input.escrow ?? null, isWritable: true },
    tokenMint: { value: input.tokenMint ?? null, isWritable: false },
    escrowToken: { value: input.escrowToken ?? null, isWritable: true },
    sender: { value: input.sender ?? null, isWritable: true },
    senderToken: { value: input.senderToken ?? null, isWritable: true },
    recipient: { value: input.recipient ?? null, isWritable: false },
    tokenProgram: { value: input.tokenProgram ?? null, isWritable: false },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
    eventAuthority: { value: input.eventAuthority ?? null, isWritable: false },
    program: { value: input.program ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  // Resolve default values.
  if (!accounts.tokenProgram.value) {
    accounts.tokenProgram.value =
      'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' as Address<'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'>;
  }
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.base),
      getAccountMeta(accounts.escrow),
      getAccountMeta(accounts.tokenMint),
      getAccountMeta(accounts.escrowToken),
      getAccountMeta(accounts.sender),
      getAccountMeta(accounts.senderToken),
      getAccountMeta(accounts.recipient),
      getAccountMeta(accounts.tokenProgram),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.eventAuthority),
      getAccountMeta(accounts.program),
    ],
    programAddress,
    data: getCreateVestingEscrowV2InstructionDataEncoder().encode(
      args as CreateVestingEscrowV2InstructionDataArgs
    ),
  } as CreateVestingEscrowV2Instruction<
    TProgramAddress,
    TAccountBase,
    TAccountEscrow,
    TAccountTokenMint,
    TAccountEscrowToken,
    TAccountSender,
    TAccountSenderToken,
    TAccountRecipient,
    TAccountTokenProgram,
    TAccountSystemProgram,
    TAccountEventAuthority,
    TAccountProgram
  >;

  return instruction;
}

export type ParsedCreateVestingEscrowV2Instruction<
  TProgram extends string = typeof LOCKER_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** Base. */
    base: TAccountMetas[0];
    /** Escrow. */
    escrow: TAccountMetas[1];
    tokenMint: TAccountMetas[2];
    /** Escrow Token Account. */
    escrowToken: TAccountMetas[3];
    /** Sender. */
    sender: TAccountMetas[4];
    /** Sender Token Account. */
    senderToken: TAccountMetas[5];
    recipient: TAccountMetas[6];
    /** Token program. */
    tokenProgram: TAccountMetas[7];
    /** system program. */
    systemProgram: TAccountMetas[8];
    eventAuthority: TAccountMetas[9];
    program: TAccountMetas[10];
  };
  data: CreateVestingEscrowV2InstructionData;
};

export function parseCreateVestingEscrowV2Instruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedCreateVestingEscrowV2Instruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 11) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      base: getNextAccount(),
      escrow: getNextAccount(),
      tokenMint: getNextAccount(),
      escrowToken: getNextAccount(),
      sender: getNextAccount(),
      senderToken: getNextAccount(),
      recipient: getNextAccount(),
      tokenProgram: getNextAccount(),
      systemProgram: getNextAccount(),
      eventAuthority: getNextAccount(),
      program: getNextAccount(),
    },
    data: getCreateVestingEscrowV2InstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
