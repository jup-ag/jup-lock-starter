import { useCallback, useMemo } from "react";

import type { FieldProps } from "./types";
import { CancelMode, ModeLabel } from "../../../program/modes";
import { parseLockSchemaValue } from "./utils";
import { cn } from "../../../styles/cn";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../../Select";
import { Field } from "./Field";

export const CancelModeField: React.FC<FieldProps> = ({ state, setState }) => {
  const setCancelMode = useCallback(
    (cancelMode: CancelMode) => {
      setState((prev) => ({ ...prev, cancelMode }));
    },
    [state],
  );
  const cancelModeError = useMemo(() => {
    return parseLockSchemaValue(state, "cancelMode");
  }, [state]);

  return (
    <Field>
      <span className={cn("block", { "text-red-500": !!cancelModeError })}>
        Who can cancel the lock?
      </span>
      <Select
        value={state.cancelMode}
        onValueChange={(value) => {
          setCancelMode(value as CancelMode);
        }}
      >
        <SelectTrigger className="w-full">
          {state.cancelMode
            ? ModeLabel[state.cancelMode]
            : "Select cancel mode"}
        </SelectTrigger>
        <SelectContent sideOffset={18}>
          {Object.values(CancelMode).map((mode) => (
            <SelectItem key={`cancel_${mode}`} textValue={mode} value={mode}>
              {ModeLabel[mode]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {cancelModeError && (
        <p className={cn("text-[0.8rem] font-medium text-red-500")}>
          {cancelModeError}
        </p>
      )}
    </Field>
  );
};
