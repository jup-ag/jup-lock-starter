import { useCallback, useMemo } from "react";
import { useWallet } from "@solana-wallets/react-2.0";

import type { FieldProps } from "./types";
import { parseLockSchemaValue } from "./utils";
import { cn } from "../../../styles/cn";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../../Select";
import { Field } from "./Field";
import { TruncatedAddress } from "../../TruncatedAddress";
import { useBalances } from "../../../rpc/useBalances";

export const TokenField: React.FC<FieldProps> = ({ state, setState }) => {
  const { getTransactionSendingSigner, connectedAccount } = useWallet();
  const signer = useMemo(
    () => getTransactionSendingSigner(),
    [connectedAccount],
  );
  const { data: balances } = useBalances(signer?.address.toString());

  const setTokenAddress = useCallback(
    (addr: string | undefined) => {
      setState((prev) => ({ ...prev, tokenAddress: addr }));
    },
    [setState],
  );
  const tokenAddressError = useMemo(() => {
    return parseLockSchemaValue(state, "tokenAddress");
  }, [state]);

  return (
    <Field>
      <span className={cn("block", { "text-red-500": !!tokenAddressError })}>
        Token
      </span>
      <Select value={state.tokenAddress} onValueChange={setTokenAddress}>
        <SelectTrigger className="w-full">
          {state.tokenAddress ? (
            <TruncatedAddress
              address={state.tokenAddress}
              charsStart={8}
              charsEnd={8}
            />
          ) : (
            "Select a token"
          )}
        </SelectTrigger>
        {balances && (
          <SelectContent sideOffset={18}>
            {Object.entries(balances).map(([addr, info]) => (
              <SelectItem key={addr} textValue={addr} value={addr}>
                <div className="flex items-center gap-x-2.5 justify-between w-full">
                  <div>
                    <TruncatedAddress address={addr} />
                  </div>
                  <div className="text-right ml-auto">
                    {info.display.toFixed(2)}
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        )}
      </Select>
      {tokenAddressError && (
        <p className={cn("text-[0.8rem] font-medium text-red-500")}>
          {tokenAddressError}
        </p>
      )}
    </Field>
  );
};
