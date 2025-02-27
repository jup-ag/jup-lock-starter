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
  getU64Decoder,
  getU64Encoder,
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
  getRemainingAccountsInfoDecoder,
  getRemainingAccountsInfoEncoder,
  type RemainingAccountsInfo,
  type RemainingAccountsInfoArgs,
} from '../types';

export const FUND_ROOT_ESCROW_DISCRIMINATOR = new Uint8Array([
  251, 106, 189, 200, 108, 15, 144, 95,
]);

export function getFundRootEscrowDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(
    FUND_ROOT_ESCROW_DISCRIMINATOR
  );
}

export type FundRootEscrowInstruction<
  TProgram extends string = typeof LOCKER_PROGRAM_ADDRESS,
  TAccountRootEscrow extends string | IAccountMeta<string> = string,
  TAccountTokenMint extends string | IAccountMeta<string> = string,
  TAccountRootEscrowToken extends string | IAccountMeta<string> = string,
  TAccountPayer extends string | IAccountMeta<string> = string,
  TAccountPayerToken extends string | IAccountMeta<string> = string,
  TAccountTokenProgram extends
    | string
    | IAccountMeta<string> = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TAccountAssociatedTokenProgram extends
    | string
    | IAccountMeta<string> = 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
  TAccountEventAuthority extends string | IAccountMeta<string> = string,
  TAccountProgram extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountRootEscrow extends string
        ? WritableAccount<TAccountRootEscrow>
        : TAccountRootEscrow,
      TAccountTokenMint extends string
        ? ReadonlyAccount<TAccountTokenMint>
        : TAccountTokenMint,
      TAccountRootEscrowToken extends string
        ? WritableAccount<TAccountRootEscrowToken>
        : TAccountRootEscrowToken,
      TAccountPayer extends string
        ? WritableSignerAccount<TAccountPayer> &
            IAccountSignerMeta<TAccountPayer>
        : TAccountPayer,
      TAccountPayerToken extends string
        ? WritableAccount<TAccountPayerToken>
        : TAccountPayerToken,
      TAccountTokenProgram extends string
        ? ReadonlyAccount<TAccountTokenProgram>
        : TAccountTokenProgram,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      TAccountAssociatedTokenProgram extends string
        ? ReadonlyAccount<TAccountAssociatedTokenProgram>
        : TAccountAssociatedTokenProgram,
      TAccountEventAuthority extends string
        ? ReadonlyAccount<TAccountEventAuthority>
        : TAccountEventAuthority,
      TAccountProgram extends string
        ? ReadonlyAccount<TAccountProgram>
        : TAccountProgram,
      ...TRemainingAccounts,
    ]
  >;

export type FundRootEscrowInstructionData = {
  discriminator: ReadonlyUint8Array;
  maxAmount: bigint;
  remainingAccountsInfo: Option<RemainingAccountsInfo>;
};

export type FundRootEscrowInstructionDataArgs = {
  maxAmount: number | bigint;
  remainingAccountsInfo: OptionOrNullable<RemainingAccountsInfoArgs>;
};

export function getFundRootEscrowInstructionDataEncoder(): Encoder<FundRootEscrowInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['maxAmount', getU64Encoder()],
      [
        'remainingAccountsInfo',
        getOptionEncoder(getRemainingAccountsInfoEncoder()),
      ],
    ]),
    (value) => ({ ...value, discriminator: FUND_ROOT_ESCROW_DISCRIMINATOR })
  );
}

export function getFundRootEscrowInstructionDataDecoder(): Decoder<FundRootEscrowInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['maxAmount', getU64Decoder()],
    [
      'remainingAccountsInfo',
      getOptionDecoder(getRemainingAccountsInfoDecoder()),
    ],
  ]);
}

export function getFundRootEscrowInstructionDataCodec(): Codec<
  FundRootEscrowInstructionDataArgs,
  FundRootEscrowInstructionData
> {
  return combineCodec(
    getFundRootEscrowInstructionDataEncoder(),
    getFundRootEscrowInstructionDataDecoder()
  );
}

export type FundRootEscrowAsyncInput<
  TAccountRootEscrow extends string = string,
  TAccountTokenMint extends string = string,
  TAccountRootEscrowToken extends string = string,
  TAccountPayer extends string = string,
  TAccountPayerToken extends string = string,
  TAccountTokenProgram extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountAssociatedTokenProgram extends string = string,
  TAccountEventAuthority extends string = string,
  TAccountProgram extends string = string,
> = {
  /** Root Escrow. */
  rootEscrow: Address<TAccountRootEscrow>;
  tokenMint: Address<TAccountTokenMint>;
  /** Escrow Token Account. */
  rootEscrowToken?: Address<TAccountRootEscrowToken>;
  /** Payer. */
  payer: TransactionSigner<TAccountPayer>;
  /** Payer Token Account. */
  payerToken: Address<TAccountPayerToken>;
  /** Token program. */
  tokenProgram?: Address<TAccountTokenProgram>;
  /** system program. */
  systemProgram?: Address<TAccountSystemProgram>;
  associatedTokenProgram?: Address<TAccountAssociatedTokenProgram>;
  eventAuthority?: Address<TAccountEventAuthority>;
  program: Address<TAccountProgram>;
  maxAmount: FundRootEscrowInstructionDataArgs['maxAmount'];
  remainingAccountsInfo: FundRootEscrowInstructionDataArgs['remainingAccountsInfo'];
};

export async function getFundRootEscrowInstructionAsync<
  TAccountRootEscrow extends string,
  TAccountTokenMint extends string,
  TAccountRootEscrowToken extends string,
  TAccountPayer extends string,
  TAccountPayerToken extends string,
  TAccountTokenProgram extends string,
  TAccountSystemProgram extends string,
  TAccountAssociatedTokenProgram extends string,
  TAccountEventAuthority extends string,
  TAccountProgram extends string,
  TProgramAddress extends Address = typeof LOCKER_PROGRAM_ADDRESS,
>(
  input: FundRootEscrowAsyncInput<
    TAccountRootEscrow,
    TAccountTokenMint,
    TAccountRootEscrowToken,
    TAccountPayer,
    TAccountPayerToken,
    TAccountTokenProgram,
    TAccountSystemProgram,
    TAccountAssociatedTokenProgram,
    TAccountEventAuthority,
    TAccountProgram
  >,
  config?: { programAddress?: TProgramAddress }
): Promise<
  FundRootEscrowInstruction<
    TProgramAddress,
    TAccountRootEscrow,
    TAccountTokenMint,
    TAccountRootEscrowToken,
    TAccountPayer,
    TAccountPayerToken,
    TAccountTokenProgram,
    TAccountSystemProgram,
    TAccountAssociatedTokenProgram,
    TAccountEventAuthority,
    TAccountProgram
  >
> {
  // Program address.
  const programAddress = config?.programAddress ?? LOCKER_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    rootEscrow: { value: input.rootEscrow ?? null, isWritable: true },
    tokenMint: { value: input.tokenMint ?? null, isWritable: false },
    rootEscrowToken: { value: input.rootEscrowToken ?? null, isWritable: true },
    payer: { value: input.payer ?? null, isWritable: true },
    payerToken: { value: input.payerToken ?? null, isWritable: true },
    tokenProgram: { value: input.tokenProgram ?? null, isWritable: false },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
    associatedTokenProgram: {
      value: input.associatedTokenProgram ?? null,
      isWritable: false,
    },
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
  if (!accounts.rootEscrowToken.value) {
    accounts.rootEscrowToken.value = await getProgramDerivedAddress({
      programAddress:
        'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL' as Address<'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'>,
      seeds: [
        getAddressEncoder().encode(expectAddress(accounts.rootEscrow.value)),
        getAddressEncoder().encode(expectAddress(accounts.tokenProgram.value)),
        getAddressEncoder().encode(expectAddress(accounts.tokenMint.value)),
      ],
    });
  }
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }
  if (!accounts.associatedTokenProgram.value) {
    accounts.associatedTokenProgram.value =
      'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL' as Address<'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'>;
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
      getAccountMeta(accounts.rootEscrow),
      getAccountMeta(accounts.tokenMint),
      getAccountMeta(accounts.rootEscrowToken),
      getAccountMeta(accounts.payer),
      getAccountMeta(accounts.payerToken),
      getAccountMeta(accounts.tokenProgram),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.associatedTokenProgram),
      getAccountMeta(accounts.eventAuthority),
      getAccountMeta(accounts.program),
    ],
    programAddress,
    data: getFundRootEscrowInstructionDataEncoder().encode(
      args as FundRootEscrowInstructionDataArgs
    ),
  } as FundRootEscrowInstruction<
    TProgramAddress,
    TAccountRootEscrow,
    TAccountTokenMint,
    TAccountRootEscrowToken,
    TAccountPayer,
    TAccountPayerToken,
    TAccountTokenProgram,
    TAccountSystemProgram,
    TAccountAssociatedTokenProgram,
    TAccountEventAuthority,
    TAccountProgram
  >;

  return instruction;
}

export type FundRootEscrowInput<
  TAccountRootEscrow extends string = string,
  TAccountTokenMint extends string = string,
  TAccountRootEscrowToken extends string = string,
  TAccountPayer extends string = string,
  TAccountPayerToken extends string = string,
  TAccountTokenProgram extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountAssociatedTokenProgram extends string = string,
  TAccountEventAuthority extends string = string,
  TAccountProgram extends string = string,
> = {
  /** Root Escrow. */
  rootEscrow: Address<TAccountRootEscrow>;
  tokenMint: Address<TAccountTokenMint>;
  /** Escrow Token Account. */
  rootEscrowToken: Address<TAccountRootEscrowToken>;
  /** Payer. */
  payer: TransactionSigner<TAccountPayer>;
  /** Payer Token Account. */
  payerToken: Address<TAccountPayerToken>;
  /** Token program. */
  tokenProgram?: Address<TAccountTokenProgram>;
  /** system program. */
  systemProgram?: Address<TAccountSystemProgram>;
  associatedTokenProgram?: Address<TAccountAssociatedTokenProgram>;
  eventAuthority: Address<TAccountEventAuthority>;
  program: Address<TAccountProgram>;
  maxAmount: FundRootEscrowInstructionDataArgs['maxAmount'];
  remainingAccountsInfo: FundRootEscrowInstructionDataArgs['remainingAccountsInfo'];
};

export function getFundRootEscrowInstruction<
  TAccountRootEscrow extends string,
  TAccountTokenMint extends string,
  TAccountRootEscrowToken extends string,
  TAccountPayer extends string,
  TAccountPayerToken extends string,
  TAccountTokenProgram extends string,
  TAccountSystemProgram extends string,
  TAccountAssociatedTokenProgram extends string,
  TAccountEventAuthority extends string,
  TAccountProgram extends string,
  TProgramAddress extends Address = typeof LOCKER_PROGRAM_ADDRESS,
>(
  input: FundRootEscrowInput<
    TAccountRootEscrow,
    TAccountTokenMint,
    TAccountRootEscrowToken,
    TAccountPayer,
    TAccountPayerToken,
    TAccountTokenProgram,
    TAccountSystemProgram,
    TAccountAssociatedTokenProgram,
    TAccountEventAuthority,
    TAccountProgram
  >,
  config?: { programAddress?: TProgramAddress }
): FundRootEscrowInstruction<
  TProgramAddress,
  TAccountRootEscrow,
  TAccountTokenMint,
  TAccountRootEscrowToken,
  TAccountPayer,
  TAccountPayerToken,
  TAccountTokenProgram,
  TAccountSystemProgram,
  TAccountAssociatedTokenProgram,
  TAccountEventAuthority,
  TAccountProgram
> {
  // Program address.
  const programAddress = config?.programAddress ?? LOCKER_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    rootEscrow: { value: input.rootEscrow ?? null, isWritable: true },
    tokenMint: { value: input.tokenMint ?? null, isWritable: false },
    rootEscrowToken: { value: input.rootEscrowToken ?? null, isWritable: true },
    payer: { value: input.payer ?? null, isWritable: true },
    payerToken: { value: input.payerToken ?? null, isWritable: true },
    tokenProgram: { value: input.tokenProgram ?? null, isWritable: false },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
    associatedTokenProgram: {
      value: input.associatedTokenProgram ?? null,
      isWritable: false,
    },
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
  if (!accounts.associatedTokenProgram.value) {
    accounts.associatedTokenProgram.value =
      'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL' as Address<'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.rootEscrow),
      getAccountMeta(accounts.tokenMint),
      getAccountMeta(accounts.rootEscrowToken),
      getAccountMeta(accounts.payer),
      getAccountMeta(accounts.payerToken),
      getAccountMeta(accounts.tokenProgram),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.associatedTokenProgram),
      getAccountMeta(accounts.eventAuthority),
      getAccountMeta(accounts.program),
    ],
    programAddress,
    data: getFundRootEscrowInstructionDataEncoder().encode(
      args as FundRootEscrowInstructionDataArgs
    ),
  } as FundRootEscrowInstruction<
    TProgramAddress,
    TAccountRootEscrow,
    TAccountTokenMint,
    TAccountRootEscrowToken,
    TAccountPayer,
    TAccountPayerToken,
    TAccountTokenProgram,
    TAccountSystemProgram,
    TAccountAssociatedTokenProgram,
    TAccountEventAuthority,
    TAccountProgram
  >;

  return instruction;
}

export type ParsedFundRootEscrowInstruction<
  TProgram extends string = typeof LOCKER_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** Root Escrow. */
    rootEscrow: TAccountMetas[0];
    tokenMint: TAccountMetas[1];
    /** Escrow Token Account. */
    rootEscrowToken: TAccountMetas[2];
    /** Payer. */
    payer: TAccountMetas[3];
    /** Payer Token Account. */
    payerToken: TAccountMetas[4];
    /** Token program. */
    tokenProgram: TAccountMetas[5];
    /** system program. */
    systemProgram: TAccountMetas[6];
    associatedTokenProgram: TAccountMetas[7];
    eventAuthority: TAccountMetas[8];
    program: TAccountMetas[9];
  };
  data: FundRootEscrowInstructionData;
};

export function parseFundRootEscrowInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedFundRootEscrowInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 10) {
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
      rootEscrow: getNextAccount(),
      tokenMint: getNextAccount(),
      rootEscrowToken: getNextAccount(),
      payer: getNextAccount(),
      payerToken: getNextAccount(),
      tokenProgram: getNextAccount(),
      systemProgram: getNextAccount(),
      associatedTokenProgram: getNextAccount(),
      eventAuthority: getNextAccount(),
      program: getNextAccount(),
    },
    data: getFundRootEscrowInstructionDataDecoder().decode(instruction.data),
  };
}
