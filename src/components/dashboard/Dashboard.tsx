"use client";

import { Flex, Link, Alert } from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";

import { useAppContext } from "~/contexts/app";
import useBalancesQuery from "~/hooks/useBalancesQuery";
import useReferralsQuery from "~/hooks/useReferralsQuery";
import useConfigQuery from "~/hooks/useConfigQuery";
import useDailyRewardQuery from "~/hooks/useDailyRewardQuery";

import { apos } from "~/lib/htmlEntities";
import * as mixpanel from "~/lib/mixpanel";

import RewardsDashboardCard from "./DashboardCard";
import RewardsDashboardCardValue from "./DashboardCardValue";

export default function Dashboard() {
  const { apiToken } = useAppContext();
  const balancesQuery = useBalancesQuery();
  const referralsQuery = useReferralsQuery();
  const rewardsConfigQuery = useConfigQuery();
  const dailyRewardQuery = useDailyRewardQuery();

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(
      balancesQuery.isError ||
        referralsQuery.isError ||
        rewardsConfigQuery.isError ||
        dailyRewardQuery.isError,
    );
  }, [
    balancesQuery.isError,
    referralsQuery.isError,
    rewardsConfigQuery.isError,
    dailyRewardQuery.isError,
  ]);

  const handleShareClick = useCallback(() => {
    mixpanel.logEvent(mixpanel.EventTypes.ACTION, { Source: "Share button" });
  }, []);

  let shareText = `Claim your free @blockscout #Merits and start building your daily streak today! #Blockscout #Merits #IYKYK\n\nBoost your rewards instantly by using my referral code: ${referralsQuery.data?.link}`;
  if (Number(dailyRewardQuery.data?.streak) > 0) {
    const days = `day${Number(dailyRewardQuery.data?.streak) === 1 ? "" : "s"}`;
    shareText =
      `I${apos}ve claimed Merits ${dailyRewardQuery.data?.streak} ${days} in a row!\n\n` +
      shareText;
  }

  if (!apiToken) {
    return null;
  }

  return (
    <Flex flexDirection="column" w="full">
      {isError && (
        <Alert status="error">
          Failed to load some data. Please try again later.
        </Alert>
      )}
      <Flex gap={6} flexDirection={{ base: "column", md: "row" }}>
        <RewardsDashboardCard
          title="All Merits"
          description={
            <>
              Claim your daily Merits and any Merits received from referrals.
              Available only in{" "}
              <Link
                href="https://eth.blockscout.com/?utm_source=merits-website&utm_medium=balance"
                isExternal
                fontWeight="500"
              >
                Blockscout
              </Link>{" "}
              explorers.
            </>
          }
          hint={
            <>
              Total number of Merits earned from all activities.{" "}
              <Link
                href="https://docs.blockscout.com/using-blockscout/merits"
                isExternal
              >
                More info on Merits
              </Link>
            </>
          }
          direction="column-reverse"
          cardValueStyle={{ h: { base: "64px", md: "88px" } }}
        >
          <RewardsDashboardCardValue
            value={balancesQuery.data?.total || "N/A"}
            isLoading={balancesQuery.isPending}
            withIcon
          />
        </RewardsDashboardCard>
        <RewardsDashboardCard
          title="Referrals"
          description="Total number of users who have joined the program using your code or referral link."
          direction="column-reverse"
          cardValueStyle={{ h: { base: "64px", md: "88px" } }}
        >
          <RewardsDashboardCardValue
            value={
              referralsQuery.data?.referrals
                ? `${referralsQuery.data?.referrals} user${Number(referralsQuery.data?.referrals) === 1 ? "" : "s"}`
                : "N/A"
            }
            isLoading={referralsQuery.isPending}
          />
        </RewardsDashboardCard>
        <RewardsDashboardCard
          title="Streak"
          description={
            <>
              Current number of consecutive days you{apos}ve claimed your daily
              Merits. The longer your streak, the more daily Merits you can
              earn.{" "}
              <Link
                href={`https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
                isExternal
                fontWeight="500"
                onClick={handleShareClick}
              >
                Share on X
              </Link>
            </>
          }
          hint={
            <>
              See the{" "}
              <Link
                href="https://docs.blockscout.com/using-blockscout/merits/streak-rewards"
                isExternal
              >
                docs
              </Link>{" "}
              to learn how your streak number affects daily rewards
            </>
          }
          direction="column-reverse"
          cardValueStyle={{ h: { base: "64px", md: "88px" } }}
        >
          <RewardsDashboardCardValue
            value={
              dailyRewardQuery.data?.streak
                ? `${dailyRewardQuery.data?.streak} day${Number(dailyRewardQuery.data?.streak) === 1 ? "" : "s"}`
                : "N/A"
            }
            isLoading={dailyRewardQuery.isPending}
          />
        </RewardsDashboardCard>
      </Flex>
    </Flex>
  );
}
