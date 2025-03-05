import { useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useWallet } from "@solana-wallets/react-2.0";

import { useQueryLocksByUser } from "~/lock/queryLock";
import { ConnectWalletButton } from "~/components/ConnectWalletButton";
import { TruncatedAddress } from "~/components/TruncatedAddress";
import { ExternalLink } from "~/components/ExternalLink";

export const Route = createFileRoute("/locks/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { getTransactionSendingSigner, connectedAccount } = useWallet();
  const signer = useMemo(
    () => getTransactionSendingSigner(),
    [connectedAccount],
  );
  const { data: locks, status: locksStatus } = useQueryLocksByUser(
    signer?.address.toString(),
  );
  return (
    <>
      <header className="text-4xl font-medium">View Locks</header>
      <div className="space-y-7.5">
        <ConnectWalletButton />
        {/* Loading */}
        {signer && locksStatus === "pending" && <div>Loading locks...</div>}

        {/* Success */}
        {locksStatus === "success" && locks.length > 0 && (
          <ul className="flex flex-col gap-y-6">
            {locks.map((lock) => (
              <li key={lock.address} className="flex flex-col gap-y-1.5">
                <ExternalLink
                  className="hover:underline block"
                  href={`https://solscan.io/account/${lock.address}`}
                >
                  <TruncatedAddress address={lock.address} />
                </ExternalLink>
                <span>{lock.total_locked_amount}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Error */}
      </div>
    </>
  );
}
