import { useCallback, useMemo } from "react";

import type { FieldProps } from "./types";
import { ModeLabel, UpdateRecipientMode } from "../../../lock/modes";
import { parseLockSchemaValue } from "./utils";
import { cn } from "../../../styles/cn";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../../Select";
import { Field } from "./Field";

export const UpdateRecipientModeField: React.FC<FieldProps> = ({
  state,
  setState,
}) => {
  const setUpdateRecipientMode = useCallback(
    (updateRecipientMode: UpdateRecipientMode) => {
      setState((prev) => ({ ...prev, updateRecipientMode }));
    },
    [state],
  );
  const updateRecipientModeError = useMemo(() => {
    return parseLockSchemaValue(state, "updateRecipientMode");
  }, [state]);

  return (
    <Field>
      <span
        className={cn("block", {
          "text-red-500": !!updateRecipientModeError,
        })}
      >
        Who can update the recipient?
      </span>
      <Select
        value={state.updateRecipientMode}
        onValueChange={(value) => {
          setUpdateRecipientMode(value as UpdateRecipientMode);
        }}
      >
        <SelectTrigger className="w-full">
          {state.updateRecipientMode
            ? ModeLabel[state.updateRecipientMode]
            : "Select update mode"}
        </SelectTrigger>
        <SelectContent sideOffset={18}>
          {Object.values(UpdateRecipientMode).map((mode) => (
            <SelectItem key={`update_${mode}`} textValue={mode} value={mode}>
              {ModeLabel[mode]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {updateRecipientModeError && (
        <p className={cn("text-[0.8rem] font-medium text-red-500")}>
          {updateRecipientModeError}
        </p>
      )}
    </Field>
  );
};
