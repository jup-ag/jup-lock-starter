import type { Dispatch, SetStateAction } from "react";

import type { InputLockSchema } from "../../../lock/createLock";

export type FieldProps = {
  state: Partial<InputLockSchema>;
  setState: Dispatch<SetStateAction<Partial<InputLockSchema>>>;
};
