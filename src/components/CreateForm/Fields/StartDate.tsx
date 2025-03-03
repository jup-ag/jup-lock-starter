import { useCallback, useMemo } from "react";

import type { FieldProps } from "./types";
import { parseLockSchemaValue } from "./utils";
import { cn } from "../../../styles/cn";
import { Field } from "./Field";
import { Input } from "../../Input";

export const StartDateField: React.FC<FieldProps> = ({ state, setState }) => {
  const setStartDate = useCallback(
    (date: string) => {
      setState((prev) => ({ ...prev, startDate: date }));
    },
    [state],
  );
  const startDateError = useMemo(() => {
    return parseLockSchemaValue(state, "startDate");
  }, [state]);
  return (
    <Field>
      <span className={cn("block", { "text-red-500": !!startDateError })}>
        Start Date
      </span>
      <Input
        type="datetime-local"
        value={state?.startDate}
        onChange={(e) => setStartDate(e.currentTarget.value)}
      />
      {startDateError && (
        <p className={cn("text-[0.8rem] font-medium text-red-500")}>
          {startDateError}
        </p>
      )}
    </Field>
  );
};
