/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  getStructDecoder,
  getStructEncoder,
  getU64Decoder,
  getU64Encoder,
  getU8Decoder,
  getU8Encoder,
  type Codec,
  type Decoder,
  type Encoder,
} from '@solana/web3.js';

/** Accounts for [locker::create_vesting_escrow]. */
export type CreateVestingEscrowParameters = {
  vestingStartTime: bigint;
  cliffTime: bigint;
  frequency: bigint;
  cliffUnlockAmount: bigint;
  amountPerPeriod: bigint;
  numberOfPeriod: bigint;
  updateRecipientMode: number;
  cancelMode: number;
};

export type CreateVestingEscrowParametersArgs = {
  vestingStartTime: number | bigint;
  cliffTime: number | bigint;
  frequency: number | bigint;
  cliffUnlockAmount: number | bigint;
  amountPerPeriod: number | bigint;
  numberOfPeriod: number | bigint;
  updateRecipientMode: number;
  cancelMode: number;
};

export function getCreateVestingEscrowParametersEncoder(): Encoder<CreateVestingEscrowParametersArgs> {
  return getStructEncoder([
    ['vestingStartTime', getU64Encoder()],
    ['cliffTime', getU64Encoder()],
    ['frequency', getU64Encoder()],
    ['cliffUnlockAmount', getU64Encoder()],
    ['amountPerPeriod', getU64Encoder()],
    ['numberOfPeriod', getU64Encoder()],
    ['updateRecipientMode', getU8Encoder()],
    ['cancelMode', getU8Encoder()],
  ]);
}

export function getCreateVestingEscrowParametersDecoder(): Decoder<CreateVestingEscrowParameters> {
  return getStructDecoder([
    ['vestingStartTime', getU64Decoder()],
    ['cliffTime', getU64Decoder()],
    ['frequency', getU64Decoder()],
    ['cliffUnlockAmount', getU64Decoder()],
    ['amountPerPeriod', getU64Decoder()],
    ['numberOfPeriod', getU64Decoder()],
    ['updateRecipientMode', getU8Decoder()],
    ['cancelMode', getU8Decoder()],
  ]);
}

export function getCreateVestingEscrowParametersCodec(): Codec<
  CreateVestingEscrowParametersArgs,
  CreateVestingEscrowParameters
> {
  return combineCodec(
    getCreateVestingEscrowParametersEncoder(),
    getCreateVestingEscrowParametersDecoder()
  );
}
