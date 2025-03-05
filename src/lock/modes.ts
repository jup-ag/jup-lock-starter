export const UpdateRecipientMode = {
  NONE: "none",
  CREATOR_ONLY: "creator",
  RECIPIENT_ONLY: "recipient",
  CREATOR_RECIPIENT: "creator-recipient",
} as const;
export type UpdateRecipientMode =
  (typeof UpdateRecipientMode)[keyof typeof UpdateRecipientMode];
export function getUpdateRecipientModeValue(mode: UpdateRecipientMode): number {
  switch (mode) {
    case UpdateRecipientMode.NONE:
      return 0;
    case UpdateRecipientMode.CREATOR_ONLY:
      return 1;
    case UpdateRecipientMode.RECIPIENT_ONLY:
      return 2;
    case UpdateRecipientMode.CREATOR_RECIPIENT:
      return 3;
  }
}
export function getUpdateRecipientModeFromValue(
  raw: number,
): UpdateRecipientMode | undefined {
  if (raw < 0 || raw > 3) {
    return;
  }
  if (raw === 0) {
    return UpdateRecipientMode.NONE;
  }
  if (raw === 1) {
    return UpdateRecipientMode.CREATOR_ONLY;
  }
  if (raw === 2) {
    return UpdateRecipientMode.RECIPIENT_ONLY;
  }
  if (raw === 3) {
    return UpdateRecipientMode.CREATOR_RECIPIENT;
  }
}

export const CancelMode = {
  NONE: "none",
  CREATOR_ONLY: "creator",
  RECIPIENT_ONLY: "recipient",
  CREATOR_RECIPIENT: "creator-recipient",
} as const;
export type CancelMode = (typeof CancelMode)[keyof typeof CancelMode];
export function getCancelModeValue(mode: CancelMode): number {
  switch (mode) {
    case CancelMode.NONE:
      return 0;
    case CancelMode.CREATOR_ONLY:
      return 1;
    case CancelMode.RECIPIENT_ONLY:
      return 2;
    case CancelMode.CREATOR_RECIPIENT:
      return 3;
  }
}
export function getCancelModeFromValue(raw: number): CancelMode | undefined {
  if (raw < 0 || raw > 3) {
    return;
  }
  if (raw === 0) {
    return CancelMode.NONE;
  }
  if (raw === 1) {
    return CancelMode.CREATOR_ONLY;
  }
  if (raw === 2) {
    return CancelMode.RECIPIENT_ONLY;
  }
  if (raw === 3) {
    return CancelMode.CREATOR_RECIPIENT;
  }
}

export const ModeLabel: Record<UpdateRecipientMode | CancelMode, string> = {
  [UpdateRecipientMode.NONE || CancelMode.NONE]: "None",
  [UpdateRecipientMode.CREATOR_ONLY || CancelMode.CREATOR_ONLY]: "Only Creator",
  [UpdateRecipientMode.RECIPIENT_ONLY || CancelMode.RECIPIENT_ONLY]:
    "Only Recipient",
  [UpdateRecipientMode.CREATOR_RECIPIENT || CancelMode.CREATOR_RECIPIENT]:
    "Creator or Recipient",
};
