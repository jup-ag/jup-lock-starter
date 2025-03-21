/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  addDecoderSizePrefix,
  addEncoderSizePrefix,
  combineCodec,
  fixDecoderSize,
  fixEncoderSize,
  getAddressDecoder,
  getAddressEncoder,
  getBytesDecoder,
  getBytesEncoder,
  getOptionDecoder,
  getOptionEncoder,
  getProgramDerivedAddress,
  getStructDecoder,
  getStructEncoder,
  getU32Decoder,
  getU32Encoder,
  getUtf8Decoder,
  getUtf8Encoder,
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
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const UPDATE_VESTING_ESCROW_RECIPIENT_DISCRIMINATOR = new Uint8Array([
  26, 242, 127, 255, 237, 109, 47, 206,
]);

export function getUpdateVestingEscrowRecipientDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(
    UPDATE_VESTING_ESCROW_RECIPIENT_DISCRIMINATOR
  );
}

export type UpdateVestingEscrowRecipientInstruction<
  TProgram extends string = typeof LOCKER_PROGRAM_ADDRESS,
  TAccountEscrow extends string | IAccountMeta<string> = string,
  TAccountEscrowMetadata extends string | IAccountMeta<string> = string,
  TAccountSigner extends string | IAccountMeta<string> = string,
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
      TAccountEscrow extends string
        ? WritableAccount<TAccountEscrow>
        : TAccountEscrow,
      TAccountEscrowMetadata extends string
        ? WritableAccount<TAccountEscrowMetadata>
        : TAccountEscrowMetadata,
      TAccountSigner extends string
        ? WritableSignerAccount<TAccountSigner> &
            IAccountSignerMeta<TAccountSigner>
        : TAccountSigner,
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

export type UpdateVestingEscrowRecipientInstructionData = {
  discriminator: ReadonlyUint8Array;
  newRecipient: Address;
  newRecipientEmail: Option<string>;
};

export type UpdateVestingEscrowRecipientInstructionDataArgs = {
  newRecipient: Address;
  newRecipientEmail: OptionOrNullable<string>;
};

export function getUpdateVestingEscrowRecipientInstructionDataEncoder(): Encoder<UpdateVestingEscrowRecipientInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['newRecipient', getAddressEncoder()],
      [
        'newRecipientEmail',
        getOptionEncoder(
          addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())
        ),
      ],
    ]),
    (value) => ({
      ...value,
      discriminator: UPDATE_VESTING_ESCROW_RECIPIENT_DISCRIMINATOR,
    })
  );
}

export function getUpdateVestingEscrowRecipientInstructionDataDecoder(): Decoder<UpdateVestingEscrowRecipientInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['newRecipient', getAddressDecoder()],
    [
      'newRecipientEmail',
      getOptionDecoder(addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())),
    ],
  ]);
}

export function getUpdateVestingEscrowRecipientInstructionDataCodec(): Codec<
  UpdateVestingEscrowRecipientInstructionDataArgs,
  UpdateVestingEscrowRecipientInstructionData
> {
  return combineCodec(
    getUpdateVestingEscrowRecipientInstructionDataEncoder(),
    getUpdateVestingEscrowRecipientInstructionDataDecoder()
  );
}

export type UpdateVestingEscrowRecipientAsyncInput<
  TAccountEscrow extends string = string,
  TAccountEscrowMetadata extends string = string,
  TAccountSigner extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountEventAuthority extends string = string,
  TAccountProgram extends string = string,
> = {
  /** Escrow. */
  escrow: Address<TAccountEscrow>;
  /** Escrow metadata. */
  escrowMetadata?: Address<TAccountEscrowMetadata>;
  /** Signer. */
  signer: TransactionSigner<TAccountSigner>;
  /** system program. */
  systemProgram?: Address<TAccountSystemProgram>;
  eventAuthority?: Address<TAccountEventAuthority>;
  program: Address<TAccountProgram>;
  newRecipient: UpdateVestingEscrowRecipientInstructionDataArgs['newRecipient'];
  newRecipientEmail: UpdateVestingEscrowRecipientInstructionDataArgs['newRecipientEmail'];
};

export async function getUpdateVestingEscrowRecipientInstructionAsync<
  TAccountEscrow extends string,
  TAccountEscrowMetadata extends string,
  TAccountSigner extends string,
  TAccountSystemProgram extends string,
  TAccountEventAuthority extends string,
  TAccountProgram extends string,
  TProgramAddress extends Address = typeof LOCKER_PROGRAM_ADDRESS,
>(
  input: UpdateVestingEscrowRecipientAsyncInput<
    TAccountEscrow,
    TAccountEscrowMetadata,
    TAccountSigner,
    TAccountSystemProgram,
    TAccountEventAuthority,
    TAccountProgram
  >,
  config?: { programAddress?: TProgramAddress }
): Promise<
  UpdateVestingEscrowRecipientInstruction<
    TProgramAddress,
    TAccountEscrow,
    TAccountEscrowMetadata,
    TAccountSigner,
    TAccountSystemProgram,
    TAccountEventAuthority,
    TAccountProgram
  >
> {
  // Program address.
  const programAddress = config?.programAddress ?? LOCKER_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    escrow: { value: input.escrow ?? null, isWritable: true },
    escrowMetadata: { value: input.escrowMetadata ?? null, isWritable: true },
    signer: { value: input.signer ?? null, isWritable: true },
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
      getAccountMeta(accounts.escrow),
      getAccountMeta(accounts.escrowMetadata),
      getAccountMeta(accounts.signer),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.eventAuthority),
      getAccountMeta(accounts.program),
    ],
    programAddress,
    data: getUpdateVestingEscrowRecipientInstructionDataEncoder().encode(
      args as UpdateVestingEscrowRecipientInstructionDataArgs
    ),
  } as UpdateVestingEscrowRecipientInstruction<
    TProgramAddress,
    TAccountEscrow,
    TAccountEscrowMetadata,
    TAccountSigner,
    TAccountSystemProgram,
    TAccountEventAuthority,
    TAccountProgram
  >;

  return instruction;
}

export type UpdateVestingEscrowRecipientInput<
  TAccountEscrow extends string = string,
  TAccountEscrowMetadata extends string = string,
  TAccountSigner extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountEventAuthority extends string = string,
  TAccountProgram extends string = string,
> = {
  /** Escrow. */
  escrow: Address<TAccountEscrow>;
  /** Escrow metadata. */
  escrowMetadata?: Address<TAccountEscrowMetadata>;
  /** Signer. */
  signer: TransactionSigner<TAccountSigner>;
  /** system program. */
  systemProgram?: Address<TAccountSystemProgram>;
  eventAuthority: Address<TAccountEventAuthority>;
  program: Address<TAccountProgram>;
  newRecipient: UpdateVestingEscrowRecipientInstructionDataArgs['newRecipient'];
  newRecipientEmail: UpdateVestingEscrowRecipientInstructionDataArgs['newRecipientEmail'];
};

export function getUpdateVestingEscrowRecipientInstruction<
  TAccountEscrow extends string,
  TAccountEscrowMetadata extends string,
  TAccountSigner extends string,
  TAccountSystemProgram extends string,
  TAccountEventAuthority extends string,
  TAccountProgram extends string,
  TProgramAddress extends Address = typeof LOCKER_PROGRAM_ADDRESS,
>(
  input: UpdateVestingEscrowRecipientInput<
    TAccountEscrow,
    TAccountEscrowMetadata,
    TAccountSigner,
    TAccountSystemProgram,
    TAccountEventAuthority,
    TAccountProgram
  >,
  config?: { programAddress?: TProgramAddress }
): UpdateVestingEscrowRecipientInstruction<
  TProgramAddress,
  TAccountEscrow,
  TAccountEscrowMetadata,
  TAccountSigner,
  TAccountSystemProgram,
  TAccountEventAuthority,
  TAccountProgram
> {
  // Program address.
  const programAddress = config?.programAddress ?? LOCKER_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    escrow: { value: input.escrow ?? null, isWritable: true },
    escrowMetadata: { value: input.escrowMetadata ?? null, isWritable: true },
    signer: { value: input.signer ?? null, isWritable: true },
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
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.escrow),
      getAccountMeta(accounts.escrowMetadata),
      getAccountMeta(accounts.signer),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.eventAuthority),
      getAccountMeta(accounts.program),
    ],
    programAddress,
    data: getUpdateVestingEscrowRecipientInstructionDataEncoder().encode(
      args as UpdateVestingEscrowRecipientInstructionDataArgs
    ),
  } as UpdateVestingEscrowRecipientInstruction<
    TProgramAddress,
    TAccountEscrow,
    TAccountEscrowMetadata,
    TAccountSigner,
    TAccountSystemProgram,
    TAccountEventAuthority,
    TAccountProgram
  >;

  return instruction;
}

export type ParsedUpdateVestingEscrowRecipientInstruction<
  TProgram extends string = typeof LOCKER_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** Escrow. */
    escrow: TAccountMetas[0];
    /** Escrow metadata. */
    escrowMetadata?: TAccountMetas[1] | undefined;
    /** Signer. */
    signer: TAccountMetas[2];
    /** system program. */
    systemProgram: TAccountMetas[3];
    eventAuthority: TAccountMetas[4];
    program: TAccountMetas[5];
  };
  data: UpdateVestingEscrowRecipientInstructionData;
};

export function parseUpdateVestingEscrowRecipientInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedUpdateVestingEscrowRecipientInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 6) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  const getNextOptionalAccount = () => {
    const accountMeta = getNextAccount();
    return accountMeta.address === LOCKER_PROGRAM_ADDRESS
      ? undefined
      : accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      escrow: getNextAccount(),
      escrowMetadata: getNextOptionalAccount(),
      signer: getNextAccount(),
      systemProgram: getNextAccount(),
      eventAuthority: getNextAccount(),
      program: getNextAccount(),
    },
    data: getUpdateVestingEscrowRecipientInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
