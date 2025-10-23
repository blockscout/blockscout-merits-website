"use client";

import { Flex, Box } from "@chakra-ui/react";
import { useRef } from "react";

import Dashboard from "~/components/dashboard/Dashboard";
import Banner from "~/components/Banner";
import ReferralProgramTab from "~/components/tabs/ReferralProgramTab";
import BadgesTab from "~/components/tabs/BadgesTab";
import ActivityTab from "~/components/tabs/ActivityTab";
import DappsTab from "~/components/tabs/DappsTab";
import UsersTab from "~/components/tabs/UsersTab";
import CampaignsTab from "~/components/tabs/CampaignsTab";
import OffersTab from "~/components/tabs/OffersTab";
import RoutedTabs from "~/components/shared/tabs/RoutedTabs";
import AdBanner from "~/components/shared/ad/AdBanner";

import { useAppContext } from "~/contexts/app";
import config from "~/config/app";

export default function DashboardPage() {
  const { isInitialized } = useAppContext();
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <Flex flexDirection="column" w="full" gap={8}>
      <Flex gap={6}>
        <Banner />
        <AdBanner />
      </Flex>
      <Dashboard />
      <Box ref={scrollRef} mt={-8} />
      {isInitialized && (
        <RoutedTabs
          tabs={[
            {
              id: "users",
              title: "Users",
              component: <UsersTab />,
            },
            {
              id: "activity",
              title: "Activity",
              component: <ActivityTab />,
            },
            {
              id: "referrals",
              title: "Referrals",
              component: <ReferralProgramTab />,
            },
            {
              id: "badges",
              title: "Badges",
              component: <BadgesTab />,
            },
            config.airtable.apiKey && config.airtable.baseId
              ? {
                  id: "campaigns",
                  title: "Campaigns",
                  component: <CampaignsTab scrollRef={scrollRef} />,
                }
              : null,
            {
              id: "spend",
              title: "Spend Merits",
              component: <OffersTab />,
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
