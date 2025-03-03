import { useCallback, useMemo } from "react";

import type { FieldProps } from "./types";
import { parseLockSchemaValue } from "./utils";
import { cn } from "../../../styles/cn";
import { Field } from "./Field";
import { Input } from "../../Input";

export const UnlockRateField: React.FC<FieldProps> = ({ state, setState }) => {
  const setUnlockRate = useCallback(
    (unlockRate: number | undefined) => {
      setState((prev) => ({ ...prev, unlockRate: unlockRate?.toString() }));
    },
    [state],
  );
  const unlockRateError = useMemo(() => {
    return parseLockSchemaValue(state, "unlockRate");
  }, [state]);
  return (
    <Field>
      <span className={cn("block", { "text-red-500": !!unlockRateError })}>
        Unlock Rate (in mins)
      </span>
      <Input
        type="number"
        inputMode="decimal"
        placeholder="10"
        value={state?.unlockRate}
        onInput={(e) => {
          const value = e.currentTarget.valueAsNumber;
          if (isNaN(value) || !value) {
            setUnlockRate(undefined);
            return;
          }
          setUnlockRate(value);
        }}
      />
      {unlockRateError && (
        <p className={cn("text-[0.8rem] font-medium text-red-500")}>
          {unlockRateError}
        </p>
      )}
    </Field>
  );
};
