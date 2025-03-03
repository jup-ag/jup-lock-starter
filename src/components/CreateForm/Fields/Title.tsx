import { useCallback, useMemo } from "react";

import type { FieldProps } from "./types";
import { parseLockSchemaValue } from "./utils";
import { cn } from "../../../styles/cn";
import { Field } from "./Field";
import { Input } from "../../Input";

export const TitleField: React.FC<FieldProps> = ({ state, setState }) => {
  const setTitle = useCallback(
    (newTitle: string) => {
      setState((prev) => ({ ...prev, title: newTitle }));
    },
    [state],
  );
  const titleError = useMemo(() => {
    return parseLockSchemaValue(state, "title");
  }, [state]);
  return (
    <Field>
      <span className={cn("block", { "text-red-500": !!titleError })}>
        Title
      </span>
      <Input
        placeholder="Lock no. 420"
        value={state?.title}
        onInput={(e) => setTitle(e.currentTarget.value)}
      />
      {titleError && (
        <p className={cn("text-[0.8rem] font-medium text-red-500")}>
          {titleError}
        </p>
      )}
    </Field>
  );
};
