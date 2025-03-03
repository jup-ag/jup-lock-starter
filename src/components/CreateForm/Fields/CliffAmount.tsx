import { useCallback, useMemo } from "react";

import type { FieldProps } from "./types";
import { parseLockSchemaValue } from "./utils";
import { cn } from "../../../styles/cn";
import { Field } from "./Field";
import { Input } from "../../Input";

export const CliffAmountField: React.FC<FieldProps> = ({ state, setState }) => {
  const setCliffAmount = useCallback(
    (duration: number | undefined) => {
      setState((prev) => ({ ...prev, cliffAmount: duration?.toString() }));
    },
    [state],
  );
  const cliffAmountError = useMemo(() => {
    return parseLockSchemaValue(state, "cliffAmount");
  }, [state]);
  return (
    <Field>
      <span className={cn("block", { "text-red-500": !!cliffAmountError })}>
        Cliff Amount
      </span>
      <Input
        type="number"
        inputMode="decimal"
        placeholder="60"
        value={state?.cliffAmount}
        onInput={(e) => {
          const value = e.currentTarget.valueAsNumber;
          if (isNaN(value) || !value) {
            setCliffAmount(undefined);
            return;
          }
          setCliffAmount(value);
        }}
      />
      {cliffAmountError && (
        <p className={cn("text-[0.8rem] font-medium text-red-500")}>
          {cliffAmountError}
        </p>
      )}
    </Field>
  );
};
