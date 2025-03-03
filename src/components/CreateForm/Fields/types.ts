import type { Dispatch, SetStateAction } from "react";

import type { InputLockSchema } from "../../../program/createLock";

export type FieldProps = {
  state: Partial<InputLockSchema>;
  setState: Dispatch<SetStateAction<Partial<InputLockSchema>>>;
};
