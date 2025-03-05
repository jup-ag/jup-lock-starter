import { isAddress } from "@solana/web3.js";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { Field } from "~/components/CreateForm/Field";
import { ExternalLink } from "~/components/ExternalLink";
import { Input } from "~/components/Input";
import { TruncatedAddress } from "~/components/TruncatedAddress";
import { useQueryLocksByUser } from "~/lock/queryLock";
import { cn } from "~/styles/cn";

export const Route = createFileRoute("/search/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [userAddress, setUserAddress] = useState<string | undefined>();
  const isValidUserAddress = useMemo<boolean>(
    () => !!userAddress && isAddress(userAddress),
    [userAddress],
  );
  const { data: locks, status, error } = useQueryLocksByUser(userAddress);
  return (
    <>
      <header className="text-4xl font-medium">Search Locks</header>
      <div className="space-y-7.5">
        <Field>
          <span
            className={cn("block capitalize", {
              "text-red-500": !isValidUserAddress,
            })}
          >
            Recipient Address
          </span>
          <Input
            placeholder="Bdsf..."
            name={"recipient"}
            onChange={(e) => setUserAddress(e.target.value)}
          />
          {!isValidUserAddress && (
            <p className={cn("text-[0.8rem] font-medium text-red-500")}>
              Invalid Address
            </p>
          )}
        </Field>
        {isValidUserAddress && status === "pending" ? (
          "Loading locks..."
        ) : status === "error" ? (
          `Error querying locks: ${error}`
        ) : isValidUserAddress && status === "success" ? (
          <ul className="space-y-5">
            {locks.map((lock) => (
              <li
                key={lock.address}
                className="flex flex-col gap-y-1.5 text-center justify-center"
              >
                <ExternalLink
                  href={`https://solscan.io/account/${lock.address}`}
                  className="hover:underline"
                >
                  <TruncatedAddress address={lock.address} />
                </ExternalLink>
                <div className="flex gap-x-1.5 items-center justify-center">
                  <TruncatedAddress
                    className="inline-block"
                    address={lock.mint}
                  />
                  <span className="inline-block">
                    {lock.total_locked_amount}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </>
  );
}
