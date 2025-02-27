import type { Address } from "@solana/web3.js";

import type { VestingEscrow } from "../lib";
import { formatUnits } from "../utils/number";
import { getTokenProgramFromFlag } from "./filters";
import { TOKEN_2022_PROGRAM_ID } from "../rpc/addresses";
import {
  getCancelModeFromValue,
  getUpdateRecipientModeFromValue,
  type CancelMode,
  type UpdateRecipientMode,
} from "./modes";

export type ExpandedLockInfo = LockInfo & {
  cancelledAt: number;
  cancelMode: CancelMode;
  updateRecipientMode: UpdateRecipientMode;
  isToken2022: boolean;
};

export function parseVestingEscrow({
  address,
  escrow,
  decimals,
}: {
  escrow: VestingEscrow;
  address: Address;
  decimals: number;
}): ExpandedLockInfo | undefined {
  const periodMs = escrow.frequency * BigInt(1e3);
  const cliffTimeMs = escrow.cliffTime * BigInt(1e3);
  const vestingStartTimeMs = escrow.vestingStartTime * BigInt(1e3);

  // Only include cliff unlock amount if past cliff unlock time
  const cliffUnlockAmount =
    new Date(Number(cliffTimeMs)) <= new Date() ? escrow.cliffUnlockAmount : 0n;

  // Total = cliff + period rate * number of periods
  const rawTotalAmount =
    cliffUnlockAmount + escrow.amountPerPeriod * escrow.numberOfPeriod;
  const totalAmount = Number(formatUnits(rawTotalAmount, decimals));

  const totalClaimedAmount = Number(
    formatUnits(escrow.totalClaimedAmount, decimals),
  );

  // Claim Progress
  const claimProgressBps =
    (escrow.totalClaimedAmount * BigInt(10_000)) / rawTotalAmount;
  const claimProgressPercent = Number(claimProgressBps / 100n);

  // Extract accumulated amount since cliff unlock time
  const rawTotalUnlockedAmount =
    cliffUnlockAmount + getAccumulatedAmount(escrow);
  const totalUnlockedAmount = Number(
    formatUnits(rawTotalUnlockedAmount, decimals),
  );

  const vestingEndTimeMs = cliffTimeMs + escrow.numberOfPeriod * periodMs;

  const cancelMode = getCancelModeFromValue(escrow.cancelMode);
  if (!cancelMode) {
    return;
  }
  const updateRecipientMode = getUpdateRecipientModeFromValue(
    escrow.updateRecipientMode,
  );
  if (!updateRecipientMode) {
    return;
  }

  const tokenProgram = getTokenProgramFromFlag(escrow.tokenProgramFlag);
  const isToken2022 = tokenProgram
    ? tokenProgram.toString() === TOKEN_2022_PROGRAM_ID
    : false;

  const lockInfo: ExpandedLockInfo = {
    mint: escrow.tokenMint,
    address,
    // Placeholder that gets updated after fetching metadata
    title: "",
    creator: escrow.creator,
    recipient: escrow.recipient,
    period_ms: Number(periodMs),
    cliff_time_ms: Number(cliffTimeMs),
    amount_per_period: Number(formatUnits(escrow.amountPerPeriod, decimals)),
    cliff_unlock_amount: Number(formatUnits(cliffUnlockAmount, decimals)),
    vesting_start_time_ms: Number(vestingStartTimeMs),
    vesting_end_time_ms: Number(vestingEndTimeMs),
    total_locked_amount: totalAmount,
    total_unlocked_amount: totalUnlockedAmount,
    claim_progress_percent: claimProgressPercent,
    total_claimed_amount: totalClaimedAmount,
    cancelledAt: Number(escrow.cancelledAt),
    cancelMode,
    updateRecipientMode,
    isToken2022,
  };

  return lockInfo;
}

export function getAccumulatedAmount(escrow: VestingEscrow) {
  const currentTime = BigInt(Math.floor(new Date().getTime() / 1000));

  if (currentTime < escrow.cliffTime) {
    return 0n;
  }

  // Max number of vested period to full vesting periods
  let vestedPeriods = Math.floor(
    Number((currentTime - escrow.cliffTime) / escrow.frequency),
  );

  vestedPeriods =
    vestedPeriods > 0
      ? Math.min(vestedPeriods, Number(escrow.numberOfPeriod))
      : 0;

  const accumulatedAmount = escrow.amountPerPeriod * BigInt(vestedPeriods);
  return accumulatedAmount;
}
