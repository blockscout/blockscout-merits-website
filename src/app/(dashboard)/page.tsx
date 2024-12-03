"use client";

import { Flex, Link, Alert } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import RewardsDashboardCard from "~/components/dashboard/DashboardCard";
import RewardsDashboardCardValue from "~/components/dashboard/DashboardCardValue";
import DashboardBanner from "~/components/dashboard/DashboardBanner";
import ReferralProgramTab from "~/components/dashboard/tabs/ReferralProgramTab";
import BadgesTab from "~/components/dashboard/tabs/BadgesTab";
import TasksTab from "~/components/dashboard/tabs/TasksTab";
import DappsTab from "~/components/dashboard/tabs/DappsTab";
import RoutedTabs from "~/components/tabs/RoutedTabs";

import { useAppContext } from "~/contexts/app";
import useBalancesQuery from "~/hooks/useBalancesQuery";
import useReferralsQuery from "~/hooks/useReferralsQuery";
import useConfigQuery from "~/hooks/useConfigQuery";
import useDailyRewardQuery from "~/hooks/useDailyRewardQuery";

import { apos } from "~/lib/htmlEntities";

export default function Dashboard() {
  const { isInitialized, apiToken } = useAppContext();
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

  const streakValue = dailyRewardQuery.data?.streak
    ? `${dailyRewardQuery.data?.streak} day${Number(dailyRewardQuery.data?.streak) === 1 ? "" : "s"}`
    : "N/A";

  const earnedWithStreak =
    dailyRewardQuery.data?.streak &&
    rewardsConfigQuery.data?.rewards.daily_claim
      ? `${Number(rewardsConfigQuery.data?.rewards.daily_claim) * Number(dailyRewardQuery.data?.streak)}`
      : "N/A";

  const shareText = `I${apos}ve claimed @blockscoutcom Merits ${streakValue} in a row and earned ${earnedWithStreak} total Merits! #Blockscout #Merits #IYKYK\n\nUse my referral code to get extra points: ${referralsQuery.data?.link}`;

  const content = apiToken ? (
    <>
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
                href="https://eth.blockscout.com/"
                isExternal
                fontWeight="500"
              >
                Blockscout
              </Link>{" "}
              explorers.
            </>
          }
          direction="column-reverse"
        >
          <RewardsDashboardCardValue
            label="Total balance"
            value={balancesQuery.data?.total || "N/A"}
            isLoading={balancesQuery.isPending}
            withIcon
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
          />
        </RewardsDashboardCard>
        <RewardsDashboardCard
          title="Referrals"
          description="Total number of users who have joined the program using your code or referral link."
          direction="column-reverse"
        >
          <RewardsDashboardCardValue
            label="Referrals"
            value={
              referralsQuery.data?.referrals
                ? `${referralsQuery.data?.referrals} user${Number(referralsQuery.data?.referrals) === 1 ? "" : "s"}`
                : "N/A"
            }
            isLoading={referralsQuery.isPending}
            hint="The number of referrals who registered with your code/link."
          />
        </RewardsDashboardCard>
        <RewardsDashboardCard
          title="Streak"
          description={`Current number of consecutive days you${apos}ve claimed your daily Merits.`}
          direction="column-reverse"
          contentAfter={
            <Link
              href={`https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
              isExternal
              fontWeight="500"
            >
              Share on X
            </Link>
          }
        >
          <RewardsDashboardCardValue
            label="Streak"
            value={
              dailyRewardQuery.data?.streak
                ? `${dailyRewardQuery.data?.streak} day${Number(dailyRewardQuery.data?.streak) === 1 ? "" : "s"}`
                : "N/A"
            }
            isLoading={dailyRewardQuery.isPending}
            hint={`Current number of consecutive days you${apos}ve claimed your daily Merits.`}
          />
        </RewardsDashboardCard>
      </Flex>
    </>
  ) : null;

  return (
    <Flex flexDirection="column" w="full" gap={8}>
      <DashboardBanner />
      {content}
      {isInitialized && (
        <RoutedTabs
          tabs={[
            {
              id: "referral program",
              title: "Referral program",
              component: <ReferralProgramTab />,
            },
            {
              id: "badges",
              title: "Badges",
              component: <BadgesTab />,
            },
            {
              id: "tasks",
              title: "Tasks",
              component: <TasksTab />,
              count: "(Soon)",
            },
            {
              id: "dapps",
              title: "Dapps",
              component: <DappsTab />,
              count: "(Soon)",
            },
          ].filter(Boolean)}
        />
      )}
    </Flex>
  );
}
