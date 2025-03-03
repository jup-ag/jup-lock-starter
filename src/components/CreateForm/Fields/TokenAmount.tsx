import { useCallback, useMemo } from "react";

import type { FieldProps } from "./types";
import { parseLockSchemaValue } from "./utils";
import { cn } from "../../../styles/cn";
import { Field } from "./Field";
import { Input } from "../../Input";

export const TokenAmountField: React.FC<FieldProps> = ({ state, setState }) => {
  const setTokenAmount = useCallback(
    (amount: number | undefined) => {
      setState((prev) => ({ ...prev, tokenAmount: amount?.toString() }));
    },
    [setState],
  );
  const tokenAmountError = useMemo(() => {
    return parseLockSchemaValue(state, "tokenAmount");
  }, [state]);
  return (
    <Field>
      <span className={cn("block", { "text-red-500": !!tokenAmountError })}>
        Lock amount
      </span>
      <Input
        type="number"
        inputMode="decimal"
        placeholder="69420"
        value={state?.tokenAmount}
        onInput={(e) => {
          const value = e.currentTarget.valueAsNumber;
          if (isNaN(value) || !value) {
            setTokenAmount(undefined);
            return;
          }
          setTokenAmount(value);
        }}
      />
      {tokenAmountError && (
        <p className={cn("text-[0.8rem] font-medium text-red-500")}>
          {tokenAmountError}
        </p>
      )}
    </Field>
  );
};
