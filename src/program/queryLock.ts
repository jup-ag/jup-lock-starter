import { useQuery } from "@tanstack/react-query";
import { address, type Account, type Address } from "@solana/web3.js";

import { rpc } from "../rpc/client";
import {
  fetchAllVestingEscrow,
  fetchAllVestingEscrowMetadata,
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

export function queryLocksByUser(rawAddress: string) {
  const addr = address(rawAddress);
  return useQuery({
    queryKey: ["locks", rawAddress],
    queryFn: async () => {
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
          .send(),
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
          .send(),
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
              { commitment: "confirmed" },
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

      // const mints = Array.from(
      //   new Set(vestingEscrows.map((escrow) => escrow.data.tokenMint)),
      // );
      // const mintIds = mints.map((mint) => mint.toString()).join(",");
      // const lockGroupRes = await ApiClient.getLockGroupInfos({
      //   assetIds: mintIds,
      // });
      // const lockGroupInfo = lockGroupRes.data.reduce(
      //   (acc, curr) => {
      //     acc[curr.mint] = curr;
      //     return acc;
      //   },
      //   {} as Record<string, LockGroupInfo>,
      // );

      const lockInfos: Record<string, ExpandedLockInfo> = vestingEscrows.reduce(
        (acc, raw) => {
          const decimals = lockGroupInfo[raw.data.tokenMint].decimals;
          if (!decimals) {
            return acc;
          }
          const parsed = parseVestingEscrow({
            escrow: raw.data,
            address: raw.address,
            decimals,
          });
          if (!parsed) {
            return acc;
          }
          acc[raw.address] = parsed;
          return acc;
        },
        {} as Record<string, ExpandedLockInfo>,
      );

      const metadataPdas = await Promise.allSettled(
        vestingEscrows.map((info) => {
          return rpc
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
                    bytes: LOCK_VESTING_ESCROW_METADATA_ACCOUNT_BYTES,
                  },
                },
                filterMetadataByMint(info.address),
              ],
              commitment: "confirmed",
            })
            .send();
        }),
      );

      const metadataAddresses = metadataPdas
        .filter((pda) => pda.status === "fulfilled")
        .filter((res) => res.value.length > 0)
        .map((res) => res.value[0].pubkey);

      const [metadatasRes, metadatasErr] = await p(
        fetchAllVestingEscrowMetadata(rpc, metadataAddresses, {
          commitment: "confirmed",
        }),
      );

      // TODO: add toast error
      if (metadatasErr != null) {
        console.error(
          "getAllLocks: fetchAllVestingEscrowMetadata failed: ",
          metadatasErr,
        );
        return;
      }

      for (const metadataRes of metadatasRes) {
        const metadataAddress = metadataRes.data.escrow;
        const existingInfo = lockInfos[metadataAddress.toString()];
      }

      return {
        locks: Object.values(lockInfos),
        lockGroupInfo,
      };
    },
  });
}
