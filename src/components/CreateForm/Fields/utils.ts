import { safeParse } from "valibot";

import { LockSchema, type InputLockSchema } from "../../../program/createLock";

export function parseLockSchemaValue(
  state: Partial<InputLockSchema>,
  key: keyof InputLockSchema,
) {
  const issues = safeParse(LockSchema["entries"][key], state[key]).issues;
  if (!issues || issues.length === 0) {
    return;
  }
  return issues[0].message;
}
