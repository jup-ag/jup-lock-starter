/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  containsBytes,
  fixEncoderSize,
  getBytesEncoder,
  type Address,
  type ReadonlyUint8Array,
} from "@solana/web3.js";
import {
  type ParsedCancelVestingEscrowInstruction,
  type ParsedClaimInstruction,
  type ParsedClaimV2Instruction,
  type ParsedCloseVestingEscrowInstruction,
  type ParsedCreateRootEscrowInstruction,
  type ParsedCreateVestingEscrowFromRootInstruction,
  type ParsedCreateVestingEscrowInstruction,
  type ParsedCreateVestingEscrowMetadataInstruction,
  type ParsedCreateVestingEscrowV2Instruction,
  type ParsedFundRootEscrowInstruction,
  type ParsedUpdateVestingEscrowRecipientInstruction,
} from "../instructions";

export const LOCKER_PROGRAM_ADDRESS =
  "LocpQgucEQHbqNABEYvBvwoxCPsSbG91A1QaQhQQqjn" as Address<"LocpQgucEQHbqNABEYvBvwoxCPsSbG91A1QaQhQQqjn">;

export enum LockerAccount {
  RootEscrow,
  VestingEscrow,
  VestingEscrowMetadata,
}

export function identifyLockerAccount(
  account: { data: ReadonlyUint8Array } | ReadonlyUint8Array,
): LockerAccount {
  const data = "data" in account ? account.data : account;
  if (
    containsBytes(
      data,
      fixEncoderSize(getBytesEncoder(), 8).encode(
        new Uint8Array([253, 209, 220, 107, 206, 191, 71, 158]),
      ),
      0,
    )
  ) {
    return LockerAccount.RootEscrow;
  }
  if (
    containsBytes(
      data,
      fixEncoderSize(getBytesEncoder(), 8).encode(
        new Uint8Array([244, 119, 183, 4, 73, 116, 135, 195]),
      ),
      0,
    )
  ) {
    return LockerAccount.VestingEscrow;
  }
  if (
    containsBytes(
      data,
      fixEncoderSize(getBytesEncoder(), 8).encode(
        new Uint8Array([24, 204, 166, 104, 87, 158, 76, 13]),
      ),
      0,
    )
  ) {
    return LockerAccount.VestingEscrowMetadata;
  }
  throw new Error(
    "The provided account could not be identified as a locker account.",
  );
}

export enum LockerInstruction {
  CancelVestingEscrow,
  Claim,
  ClaimV2,
  CloseVestingEscrow,
  CreateRootEscrow,
  CreateVestingEscrow,
  CreateVestingEscrowFromRoot,
  CreateVestingEscrowMetadata,
  CreateVestingEscrowV2,
  FundRootEscrow,
  UpdateVestingEscrowRecipient,
}

export function identifyLockerInstruction(
  instruction: { data: ReadonlyUint8Array } | ReadonlyUint8Array,
): LockerInstruction {
  const data = "data" in instruction ? instruction.data : instruction;
  if (
    containsBytes(
      data,
      fixEncoderSize(getBytesEncoder(), 8).encode(
        new Uint8Array([217, 233, 13, 3, 143, 101, 53, 201]),
      ),
      0,
    )
  ) {
    return LockerInstruction.CancelVestingEscrow;
  }
  if (
    containsBytes(
      data,
      fixEncoderSize(getBytesEncoder(), 8).encode(
        new Uint8Array([62, 198, 214, 193, 213, 159, 108, 210]),
      ),
      0,
    )
  ) {
    return LockerInstruction.Claim;
  }
  if (
    containsBytes(
      data,
      fixEncoderSize(getBytesEncoder(), 8).encode(
        new Uint8Array([229, 87, 46, 162, 21, 157, 231, 114]),
      ),
      0,
    )
  ) {
    return LockerInstruction.ClaimV2;
  }
  if (
    containsBytes(
      data,
      fixEncoderSize(getBytesEncoder(), 8).encode(
        new Uint8Array([221, 185, 95, 135, 136, 67, 252, 87]),
      ),
      0,
    )
  ) {
    return LockerInstruction.CloseVestingEscrow;
  }
  if (
    containsBytes(
      data,
      fixEncoderSize(getBytesEncoder(), 8).encode(
        new Uint8Array([116, 212, 12, 188, 77, 226, 32, 201]),
      ),
      0,
    )
  ) {
    return LockerInstruction.CreateRootEscrow;
  }
  if (
    containsBytes(
      data,
      fixEncoderSize(getBytesEncoder(), 8).encode(
        new Uint8Array([23, 100, 197, 94, 222, 153, 38, 90]),
      ),
      0,
    )
  ) {
    return LockerInstruction.CreateVestingEscrow;
  }
  if (
    containsBytes(
      data,
      fixEncoderSize(getBytesEncoder(), 8).encode(
        new Uint8Array([6, 238, 161, 108, 252, 114, 246, 91]),
      ),
      0,
    )
  ) {
    return LockerInstruction.CreateVestingEscrowFromRoot;
  }
  if (
    containsBytes(
      data,
      fixEncoderSize(getBytesEncoder(), 8).encode(
        new Uint8Array([93, 78, 33, 103, 173, 125, 70, 0]),
      ),
      0,
    )
  ) {
    return LockerInstruction.CreateVestingEscrowMetadata;
  }
  if (
    containsBytes(
      data,
      fixEncoderSize(getBytesEncoder(), 8).encode(
        new Uint8Array([181, 155, 104, 183, 182, 128, 35, 47]),
      ),
      0,
    )
  ) {
    return LockerInstruction.CreateVestingEscrowV2;
  }
  if (
    containsBytes(
      data,
      fixEncoderSize(getBytesEncoder(), 8).encode(
        new Uint8Array([251, 106, 189, 200, 108, 15, 144, 95]),
      ),
      0,
    )
  ) {
    return LockerInstruction.FundRootEscrow;
  }
  if (
    containsBytes(
      data,
      fixEncoderSize(getBytesEncoder(), 8).encode(
        new Uint8Array([26, 242, 127, 255, 237, 109, 47, 206]),
      ),
      0,
    )
  ) {
    return LockerInstruction.UpdateVestingEscrowRecipient;
  }
  throw new Error(
    "The provided instruction could not be identified as a locker instruction.",
  );
}

export type ParsedLockerInstruction<
  TProgram extends string = "LocpQgucEQHbqNABEYvBvwoxCPsSbG91A1QaQhQQqjn",
> =
  | ({
      instructionType: LockerInstruction.CancelVestingEscrow;
    } & ParsedCancelVestingEscrowInstruction<TProgram>)
  | ({
      instructionType: LockerInstruction.Claim;
    } & ParsedClaimInstruction<TProgram>)
  | ({
      instructionType: LockerInstruction.ClaimV2;
    } & ParsedClaimV2Instruction<TProgram>)
  | ({
      instructionType: LockerInstruction.CloseVestingEscrow;
    } & ParsedCloseVestingEscrowInstruction<TProgram>)
  | ({
      instructionType: LockerInstruction.CreateRootEscrow;
    } & ParsedCreateRootEscrowInstruction<TProgram>)
  | ({
      instructionType: LockerInstruction.CreateVestingEscrow;
    } & ParsedCreateVestingEscrowInstruction<TProgram>)
  | ({
      instructionType: LockerInstruction.CreateVestingEscrowFromRoot;
    } & ParsedCreateVestingEscrowFromRootInstruction<TProgram>)
  | ({
      instructionType: LockerInstruction.CreateVestingEscrowMetadata;
    } & ParsedCreateVestingEscrowMetadataInstruction<TProgram>)
  | ({
      instructionType: LockerInstruction.CreateVestingEscrowV2;
    } & ParsedCreateVestingEscrowV2Instruction<TProgram>)
  | ({
      instructionType: LockerInstruction.FundRootEscrow;
    } & ParsedFundRootEscrowInstruction<TProgram>)
  | ({
      instructionType: LockerInstruction.UpdateVestingEscrowRecipient;
    } & ParsedUpdateVestingEscrowRecipientInstruction<TProgram>);
