import { useCallback, useMemo } from "react";

import type { FieldProps } from "./types";
import { parseLockSchemaValue } from "./utils";
import { cn } from "../../../styles/cn";
import { Field } from "./Field";
import { Input } from "../../Input";

export const CliffDurationField: React.FC<FieldProps> = ({
  state,
  setState,
}) => {
  const setCliffDuration = useCallback(
    (duration: number | undefined) => {
      setState((prev) => ({ ...prev, cliffDuration: duration?.toString() }));
    },
    [state],
  );
  const cliffDurationError = useMemo(() => {
    return parseLockSchemaValue(state, "cliffDuration");
  }, [state]);
  return (
    <Field>
      <span className={cn("block", { "text-red-500": !!cliffDurationError })}>
        Cliff Duration (in mins)
      </span>
      <Input
        type="number"
        inputMode="decimal"
        placeholder="60"
        value={state?.cliffDuration}
        onInput={(e) => {
          const value = e.currentTarget.valueAsNumber;
          if (isNaN(value) || !value) {
            setCliffDuration(undefined);
            return;
          }
          setCliffDuration(value);
        }}
      />
      {cliffDurationError && (
        <p className={cn("text-[0.8rem] font-medium text-red-500")}>
          {cliffDurationError}
        </p>
      )}
    </Field>
  );
};
