"use client";

import { Flex, Link, Alert } from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";

import RewardsDashboardCard from "~/components/dashboard/DashboardCard";
import RewardsDashboardCardValue from "~/components/dashboard/DashboardCardValue";
import DashboardBanner from "~/components/dashboard/DashboardBanner";
import ReferralProgramTab from "~/components/tabs/ReferralProgramTab";
import BadgesTab from "~/components/tabs/BadgesTab";
import TasksTab from "~/components/tabs/TasksTab";
import DappsTab from "~/components/tabs/DappsTab";
import UsersTab from "~/components/tabs/UsersTab";
import CampaignsTab from "~/components/tabs/CampaignsTab";
import RoutedTabs from "~/components/shared/tabs/RoutedTabs";

import { useAppContext } from "~/contexts/app";
import useBalancesQuery from "~/hooks/useBalancesQuery";
import useReferralsQuery from "~/hooks/useReferralsQuery";
import useConfigQuery from "~/hooks/useConfigQuery";
import useDailyRewardQuery from "~/hooks/useDailyRewardQuery";

import { apos } from "~/lib/htmlEntities";
import * as mixpanel from "~/lib/mixpanel";

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

  const handleShareClick = useCallback(() => {
    mixpanel.logEvent(mixpanel.EventTypes.ACTION, { Source: "Share button" });
  }, []);

  let shareText = `Claim your free @blockscoutcom #Merits and start building your daily streak today! #Blockscout #Merits #IYKYK\n\nBoost your rewards instantly by using my referral code: ${referralsQuery.data?.link}`;
  if (Number(dailyRewardQuery.data?.streak) > 0) {
    const days = `day${Number(dailyRewardQuery.data?.streak) === 1 ? "" : "s"}`;
    shareText =
      `I${apos}ve claimed Merits ${dailyRewardQuery.data?.streak} ${days} in a row!\n\n` +
      shareText;
  }

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
                href="https://eth.blockscout.com/?utm_source=merits-website&utm_medium=balance"
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
          direction="column-reverse"
        >
          <RewardsDashboardCardValue
            label="Streak"
            value={
              dailyRewardQuery.data?.streak
                ? `${dailyRewardQuery.data?.streak} day${Number(dailyRewardQuery.data?.streak) === 1 ? "" : "s"}`
                : "N/A"
            }
            isLoading={dailyRewardQuery.isPending}
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
              id: "users",
              title: "Users",
              component: <UsersTab />,
            },
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
              id: "campaigns",
              title: "Campaigns",
              component: <CampaignsTab />,
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
