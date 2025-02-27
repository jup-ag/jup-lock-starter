/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  getAddressDecoder,
  getAddressEncoder,
  getStructDecoder,
  getStructEncoder,
  getU64Decoder,
  getU64Encoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
} from '@solana/web3.js';

export type EventCancelVestingEscrowV3 = {
  escrow: Address;
  signer: Address;
  remainingAmount: bigint;
  cancelledAt: bigint;
};

export type EventCancelVestingEscrowV3Args = {
  escrow: Address;
  signer: Address;
  remainingAmount: number | bigint;
  cancelledAt: number | bigint;
};

export function getEventCancelVestingEscrowV3Encoder(): Encoder<EventCancelVestingEscrowV3Args> {
  return getStructEncoder([
    ['escrow', getAddressEncoder()],
    ['signer', getAddressEncoder()],
    ['remainingAmount', getU64Encoder()],
    ['cancelledAt', getU64Encoder()],
  ]);
}

export function getEventCancelVestingEscrowV3Decoder(): Decoder<EventCancelVestingEscrowV3> {
  return getStructDecoder([
    ['escrow', getAddressDecoder()],
    ['signer', getAddressDecoder()],
    ['remainingAmount', getU64Decoder()],
    ['cancelledAt', getU64Decoder()],
  ]);
}

export function getEventCancelVestingEscrowV3Codec(): Codec<
  EventCancelVestingEscrowV3Args,
  EventCancelVestingEscrowV3
> {
  return combineCodec(
    getEventCancelVestingEscrowV3Encoder(),
    getEventCancelVestingEscrowV3Decoder()
  );
}
