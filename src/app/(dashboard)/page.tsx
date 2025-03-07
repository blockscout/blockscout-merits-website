"use client";

import { Flex } from "@chakra-ui/react";
import { useRef } from "react";

import Dashboard from "~/components/dashboard/Dashboard";
import Banner from "~/components/Banner";
import ReferralProgramTab from "~/components/tabs/ReferralProgramTab";
import BadgesTab from "~/components/tabs/BadgesTab";
import TasksTab from "~/components/tabs/TasksTab";
import DappsTab from "~/components/tabs/DappsTab";
import UsersTab from "~/components/tabs/UsersTab";
import CampaignsTab from "~/components/tabs/CampaignsTab";
import OffersTab from "~/components/tabs/OffersTab";
import RoutedTabs from "~/components/shared/tabs/RoutedTabs";

import { useAppContext } from "~/contexts/app";

export default function DashboardPage() {
  const { isInitialized } = useAppContext();
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <Flex flexDirection="column" w="full" gap={8}>
      <Banner />
      <Dashboard />
      <div ref={scrollRef}></div>
      {isInitialized && (
        <RoutedTabs
          tabs={[
            {
              id: "users",
              title: "Users",
              component: <UsersTab />,
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
            {
              id: "campaigns",
              title: "Campaigns",
              component: <CampaignsTab scrollRef={scrollRef} />,
            },
            {
              id: "spend",
              title: "Spend Merits",
              component: <OffersTab />,
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
