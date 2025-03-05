import { useQuery } from "@tanstack/react-query";
import {
  address,
  isAddress,
  type Account,
  type Address,
} from "@solana/web3.js";

import { rpc } from "../rpc/client";
import {
  fetchAllVestingEscrow,
  fetchAllVestingEscrowMetadata,
  fetchVestingEscrow,
  LOCKER_PROGRAM_ADDRESS,
  type VestingEscrow,
} from "../lib";
import p from "../utils/p-flat";
import {
  LOCK_VESTING_ESCROW_ACCOUNT_BYTES,
  LOCK_VESTING_ESCROW_METADATA_ACCOUNT_BYTES,
} from "./constants";
import { parseVestingEscrow, type ExpandedLockInfo } from "./parse";
import {
  filterByCreator,
  filterByRecipient,
  filterMetadataByMint,
} from "./filters";
import { fetchAllMint, type Mint } from "@solana-program/token";

export function useQueryLocksByUser(rawAddress: string | undefined) {
  return useQuery({
    queryKey: ["user", rawAddress],
    queryFn: async ({ signal }) => {
      if (!rawAddress) {
        console.error("missing address!");
        return [];
      }
      const addr = address(rawAddress);
      const [recipientLockPdas, creatorLockPdas] = await Promise.allSettled([
        rpc
          .getProgramAccounts(LOCKER_PROGRAM_ADDRESS, {
            encoding: "base64", // This is necessary otherwise response will have error -32600
            // We don't want to query data at this step due to potential limits
            dataSlice: {
              offset: 0,
              length: 0,
            },
            filters: [
              {
                memcmp: {
                  offset: 0n,
                  encoding: "base58",
                  bytes: LOCK_VESTING_ESCROW_ACCOUNT_BYTES,
                },
              },
              filterByRecipient(addr),
            ],
            commitment: "confirmed",
          })
          .send({ abortSignal: signal }),
        rpc
          .getProgramAccounts(LOCKER_PROGRAM_ADDRESS, {
            encoding: "base64", // This is necessary otherwise response will have error -32600
            // We don't want to query data at this step due to potential limits
            dataSlice: {
              offset: 0,
              length: 0,
            },
            filters: [
              {
                memcmp: {
                  offset: 0n,
                  encoding: "base58",
                  bytes: LOCK_VESTING_ESCROW_ACCOUNT_BYTES,
                },
              },
              filterByCreator(addr),
            ],
            commitment: "confirmed",
          })
          .send({ abortSignal: signal }),
      ]);

      const lockAddresses: Address[] = [];
      if (recipientLockPdas.status === "fulfilled") {
        lockAddresses.push(...recipientLockPdas.value.map((r) => r.pubkey));
      }
      if (creatorLockPdas.status === "fulfilled") {
        lockAddresses.push(...creatorLockPdas.value.map((r) => r.pubkey));
      }

      const numChunks = Math.ceil(lockAddresses.length / 100);
      const vestingEscrows: Account<VestingEscrow>[] = [];

      const locksRes = await Promise.allSettled(
        new Array(numChunks)
          .fill(0)
          .map((_, i) =>
            fetchAllVestingEscrow(
              rpc,
              lockAddresses.slice(i * 100, i * 100 + 100),
              { commitment: "confirmed", abortSignal: signal },
            ),
          ),
      );
      for (const lockRes of locksRes) {
        // TODO: add toast error
        if (lockRes.status === "rejected") {
          console.error(
            "getAllLocks: fetchAllVestingEscrow failed: ",
            lockRes.reason,
          );
          continue;
        }
        vestingEscrows.push(...lockRes.value);
      }
      for (const lockRes of locksRes) {
        // TODO: add toast error
        if (lockRes.status === "rejected") {
          console.error(
            "getAllLocks: fetchAllVestingEscrow failed: ",
            lockRes.reason,
          );
          continue;
        }
        vestingEscrows.push(...lockRes.value);
      }

      // Extract lock token mint info
      const mints = vestingEscrows.map((escrow) => escrow.data.tokenMint);
      const mintAccounts: Account<Mint>[] = [];
      const mintsRes = await Promise.allSettled(
        new Array(numChunks).fill(0).map((_, i) =>
          fetchAllMint(rpc, mints.slice(i * 100, i * 100 + 100), {
            abortSignal: signal,
          }),
        ),
      );
      for (const mintRes of mintsRes) {
        // TODO: add toast error
        if (mintRes.status === "rejected") {
          console.error("getAllLocks: fetchAllMint failed: ", mintRes.reason);
          continue;
        }
        mintAccounts.push(...mintRes.value);
      }
      for (const mintRes of mintsRes) {
        // TODO: add toast error
        if (mintRes.status === "rejected") {
          console.error("getAllLocks: fetchAllMint failed: ", mintRes.reason);
          continue;
        }
        mintAccounts.push(...mintRes.value);
      }

      const mintInfos = mintAccounts.reduce(
        (acc, curr) => {
          acc[curr.address.toString()] = curr.data;
          return acc;
        },
        {} as Record<string, Mint>,
      );

      const expanded: ExpandedLockInfo[] = vestingEscrows
        .map((escrow) => {
          const decimals = mintInfos[escrow.data.tokenMint.toString()].decimals;
          return parseVestingEscrow({
            escrow: escrow.data,
            address: escrow.address,
            decimals,
          });
        })
        .filter(Boolean) as ExpandedLockInfo[];

      return expanded;
    },
    enabled: !!rawAddress && !!isAddress(rawAddress),
  });
}

export function useQueryLockByAddress(addr: string) {
  return useQuery({
    queryKey: ["lock", addr],
    queryFn: async ({ signal }) => {
      const res = await fetchVestingEscrow(rpc, address(addr), {
        abortSignal: signal,
      });
      return res.data;
    },
  });
}
