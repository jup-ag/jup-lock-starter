import { useCallback, useMemo } from "react";

import type { FieldProps } from "./types";
import { parseLockSchemaValue } from "./utils";
import { cn } from "../../../styles/cn";
import { Field } from "./Field";
import { Input } from "../../Input";

export const RecipientAddressField: React.FC<FieldProps> = ({
  state,
  setState,
}) => {
  const setRecipientAddress = useCallback(
    (recipient: string) => {
      setState((prev) => ({ ...prev, recipient }));
    },
    [state],
  );
  const recipientAddressError = useMemo(() => {
    return parseLockSchemaValue(state, "recipient");
  }, [state]);
  return (
    <Field>
      <span
        className={cn("block", { "text-red-500": !!recipientAddressError })}
      >
        Recipient Address
      </span>
      <Input
        placeholder="Bdsf..."
        value={state?.recipient}
        onInput={(e) => setRecipientAddress(e.currentTarget.value)}
      />
      {recipientAddressError && (
        <p className={cn("text-[0.8rem] font-medium text-red-500")}>
          {recipientAddressError}
        </p>
      )}
    </Field>
  );
};
