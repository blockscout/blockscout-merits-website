import { apos } from "~/lib/htmlEntities";

import useReferralsQuery from "./useReferralsQuery";
import useConfigQuery from "./useConfigQuery";
import useDailyRewardQuery from "./useDailyRewardQuery";

export default function useShareTextForStreak() {
  const referralsQuery = useReferralsQuery();
  const rewardsConfigQuery = useConfigQuery();
  const dailyRewardQuery = useDailyRewardQuery();

  if (!Number(dailyRewardQuery.data?.streak)) {
    return `Claim your free @blockscoutcom #Merits and start building your daily streak today! #Blockscout #Merits #IYKYK\n\nBoost your rewards instantly by using my referral code: ${referralsQuery.data?.link}`;
  }

  const streakValue = dailyRewardQuery.data?.streak
    ? `${dailyRewardQuery.data?.streak} day${Number(dailyRewardQuery.data?.streak) === 1 ? "" : "s"}`
    : "N/A";

  const earnedWithStreak =
    dailyRewardQuery.data?.streak &&
    rewardsConfigQuery.data?.rewards.daily_claim
      ? `${Number(rewardsConfigQuery.data?.rewards.daily_claim) * Number(dailyRewardQuery.data?.streak)}`
      : "N/A";

  return `I${apos}ve claimed @blockscoutcom Merits ${streakValue} in a row and earned ${earnedWithStreak} total Merits! #Blockscout #Merits #IYKYK\n\nUse my referral code to get extra points: ${referralsQuery.data?.link}`;
}
