import { useQuery } from "@tanstack/react-query";
import { address } from "@solana/web3.js";

import { rpc } from "./client";
import { formatUnits } from "../utils/number";
import p from "../utils/p-flat";
import {
  TOKEN_2022_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  WRAPPED_SOL_ID,
} from "./addresses";

export type AssetBalance = {
  type: "spl" | "token-2022";
  amount: bigint;
  decimals: number;
  display: number;
};

export function useBalances(rawAddress: string | undefined) {
  return useQuery({
    queryKey: ["balances", rawAddress],
    queryFn: async ({ signal }) => {
      if (!rawAddress) {
        return {};
      }
      const addr = address(rawAddress);
      const getSolBalances = rpc
        .getAccountInfo(addr, {
          commitment: "confirmed",
          encoding: "jsonParsed",
        })
        .send({ abortSignal: signal });

      const getSplTokenBalances = rpc
        .getTokenAccountsByOwner(
          addr,
          {
            programId: address(TOKEN_PROGRAM_ID),
          },
          { encoding: "jsonParsed", commitment: "confirmed" },
        )
        .send({ abortSignal: signal });

      const getToken2022Balances = rpc
        .getTokenAccountsByOwner(
          addr,
          {
            programId: address(TOKEN_2022_PROGRAM_ID),
          },
          { encoding: "jsonParsed", commitment: "confirmed" },
        )
        .send({ abortSignal: signal });

      const [allRes, err] = await p(
        Promise.allSettled([
          getSolBalances,
          getSplTokenBalances,
          getToken2022Balances,
        ]),
      );

      if (err != null) {
        throw new Error("Error fetching balances");
      }

      const balances: Record<string, AssetBalance> = {};
      const [solBalanceRes, splTokenBalanceRes, token2022BalanceRes] = allRes;

      // SOL balance
      if (solBalanceRes.status === "fulfilled") {
        const rawLamports = solBalanceRes.value.value?.lamports;
        const decimals = 9;
        if (rawLamports != null) {
          balances[WRAPPED_SOL_ID] = {
            type: "spl",
            amount: BigInt(rawLamports),
            decimals,
            display: +formatUnits(rawLamports, decimals),
          };
        }
      }

      // SPL tokens balances
      if (splTokenBalanceRes.status === "fulfilled") {
        const data = splTokenBalanceRes.value.value;
        for (const accountData of data) {
          try {
            const mint = accountData.account.data.parsed.info.mint;
            const amount = BigInt(
              accountData.account.data.parsed.info.tokenAmount.amount,
            );
            const decimals =
              accountData.account.data.parsed.info.tokenAmount.decimals;
            if (amount === 0n) {
              continue;
            }
            balances[mint] = {
              type: "spl",
              amount,
              decimals,
              display: +formatUnits(amount, decimals),
            };
          } catch (e) {
            console.error("Error parsing token balance", e);
            continue;
          }
        }
      }

      // Token 2022 tokens balances
      if (token2022BalanceRes.status === "fulfilled") {
        const data = token2022BalanceRes.value.value;
        for (const accountData of data) {
          try {
            const mint = accountData.account.data.parsed.info.mint;
            const amount = BigInt(
              accountData.account.data.parsed.info.tokenAmount.amount,
            );
            const decimals =
              accountData.account.data.parsed.info.tokenAmount.decimals;
            if (amount === 0n) {
              continue;
            }
            balances[mint] = {
              type: "token-2022",
              amount,
              decimals,
              display: +formatUnits(amount, decimals),
            };
          } catch (e) {
            console.error("Error parsing token balance", e);
            continue;
          }
        }
      }

      return balances;
    },
  });
}
