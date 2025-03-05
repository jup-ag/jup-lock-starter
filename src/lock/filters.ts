import {
  address,
  type Address,
  type GetProgramAccountsMemcmpFilter,
} from "@solana/web3.js";

import { TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from "../rpc/addresses";

export function getTokenProgramFromFlag(flag: number): Address | undefined {
  switch (flag) {
    case 0:
      return address(TOKEN_PROGRAM_ID);
    case 1:
      return address(TOKEN_2022_PROGRAM_ID);
  }
}

export const filterByEscrow: GetProgramAccountsMemcmpFilter = {
  memcmp: { offset: 0n, encoding: "base58", bytes: "hteFiUjrzUz" },
};

// refer to https://github.com/jup-ag/jup-lock/blob/main/programs/locker/src/state/vesting_escrow.rs
export const filterByCreator = (
  creator: Address,
): GetProgramAccountsMemcmpFilter => {
  return {
    memcmp: { offset: 72n, encoding: "base58", bytes: creator.toString() },
  };
};

// refer to https://github.com/jup-ag/jup-lock/blob/main/programs/locker/src/state/vesting_escrow.rs
export const filterByRecipient = (
  creator: Address,
): GetProgramAccountsMemcmpFilter => {
  return {
    memcmp: { offset: 8n, encoding: "base58", bytes: creator.toString() },
  };
};

export const filterMetadata: GetProgramAccountsMemcmpFilter = {
  memcmp: { offset: 0n, encoding: "base58", bytes: "59axEA9Qcap" },
};

export const filterMetadataByMint = (
  escrow: Address,
): GetProgramAccountsMemcmpFilter => ({
  memcmp: { offset: 8n, encoding: "base58", bytes: escrow.toString() },
});
