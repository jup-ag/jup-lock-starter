import { createFileRoute } from "@tanstack/react-router";
import { useWallet } from "@solana-wallets/react-2.0";

import { ConnectWalletButton } from "../../components/ConnectWalletButton";
import { useMemo } from "react";
import { useQueryLocksByUser } from "../../lock/queryLock";
import { useBalances } from "../../rpc/useBalances";
import { TruncatedAddress } from "../../components/TruncatedAddress";

export const Route = createFileRoute("/locks/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { getTransactionSendingSigner, connectedAccount } = useWallet();
  const signer = useMemo(
    () => getTransactionSendingSigner(),
    [connectedAccount],
  );
  const { data: balances } = useBalances(signer?.address.toString());
  const { data: locks, status: locksStatus } = useQueryLocksByUser(
    signer?.address.toString(),
    balances,
  );
  return (
    <>
      <header className="text-4xl font-medium">View Locks</header>
      <div className="space-y-7.5">
        <ConnectWalletButton />
        {locksStatus === "success" && locks.length > 0 ? (
          <ul className="flex flex-col gap-y-6">
            {locks.map((lock) => (
              <li key={lock.address}>
                <a
                  className="flex flex-col gap-y-1.5"
                  href={`https://solscan.io/account/${lock.address}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <TruncatedAddress address={lock.address} />
                  <span>{lock.total_locked_amount}</span>
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </>
  );
}
