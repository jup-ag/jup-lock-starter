import { useCallback, useMemo } from "react";

import type { FieldProps } from "./types";
import { parseLockSchemaValue } from "./utils";
import { cn } from "../../../styles/cn";
import { Field } from "./Field";
import { Input } from "../../Input";

export const DurationField: React.FC<FieldProps> = ({ state, setState }) => {
  const setDuration = useCallback(
    (duration: number | undefined) => {
      setState((prev) => ({ ...prev, duration: duration?.toString() }));
    },
    [state],
  );
  const durationError = useMemo(() => {
    return parseLockSchemaValue(state, "duration");
  }, [state]);
  return (
    <Field>
      <span className={cn("block", { "text-red-500": !!durationError })}>
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
            setDuration(undefined);
            return;
          }
          setDuration(value);
        }}
      />
      {durationError && (
        <p className={cn("text-[0.8rem] font-medium text-red-500")}>
          {durationError}
        </p>
      )}
    </Field>
  );
};
