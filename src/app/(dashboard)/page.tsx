"use client";

import { Flex, Link, Alert } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import RewardsDashboardCard from "~/components/dashboard/DashboardCard";
import RewardsDashboardCardValue from "~/components/dashboard/DashboardCardValue";
import DailyRewardClaimButton from "~/components/dashboard/DailyRewardClaimButton";
import DashboardBanner from "~/components/dashboard/DashboardBanner";
import ReferralProgramTab from "~/components/dashboard/tabs/ReferralProgramTab";
import BadgesTab from "~/components/dashboard/tabs/BadgesTab";
import TabsWithScroll from "~/components/tabs/TabsWithScroll";

import { useAppContext } from "~/contexts/app";
import useBalancesQuery from "~/hooks/useBalancesQuery";
import useReferralsQuery from "~/hooks/useReferralsQuery";
import useConfigQuery from "~/hooks/useConfigQuery";
import useDailyRewardQuery from "~/hooks/useDailyRewardQuery";

import { apos } from "~/lib/htmlEntities";

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

  let content = (
    <>
      {isError && (
        <Alert status="error">
          Failed to load some data. Please try again later.
        </Alert>
      )}
      <Flex gap={6} flexDirection={{ base: "column", md: "row" }}>
        <RewardsDashboardCard
          description="Claim your daily Merits and any Merits received from referrals."
          direction="column-reverse"
          contentAfter={<DailyRewardClaimButton />}
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
          title="Streaks"
          description={`Current number of consecutive days you${apos}ve claimed your daily Merits.`}
          direction="column-reverse"
          availableSoon
          blurFilter
        >
          <RewardsDashboardCardValue label="Streaks" value="5 days" />
        </RewardsDashboardCard>
      </Flex>
    </>
  );

  if (!apiToken) {
    content = <DashboardBanner />;
  }

  return (
    <Flex flexDirection="column" w="full" gap={8}>
      {content}
      <TabsWithScroll
        tabs={[
          apiToken
            ? {
                id: "referral program",
                title: "Referral program",
                component: <ReferralProgramTab />,
              }
            : null,
          {
            id: "badges",
            title: "Badges",
            component: <BadgesTab />,
          },
        ].filter(Boolean)}
      />
    </Flex>
  );
}
