import { Flex } from "@chakra-ui/react";

import DashboardCard from "~/components/dashboard/DashboardCard";
import DashboardCardValue from "~/components/dashboard/DashboardCardValue";

export default function TasksTab() {
  return (
    <Flex gap={6} flexDirection={{ base: "column", md: "row" }}>
      <DashboardCard
        title="Activity"
        description="Earn Merits for your everyday Blockscout activities. You deserve to be rewarded for choosing open-source public goods!"
        availableSoon
        blurFilter
      >
        <DashboardCardValue label="Activity" value="0%" />
        <DashboardCardValue label="Received" value="0" withIcon />
      </DashboardCard>
      <DashboardCard
        title="Verify contracts"
        description="Verified contracts are so important for transparency and interaction. Verify your contracts on Blockscout and receive Merits for your efforts." // eslint-disable-line max-len
        availableSoon
        blurFilter
      >
        <DashboardCardValue label="Activity" value="0%" />
        <DashboardCardValue label="Received" value="0" withIcon />
      </DashboardCard>
    </Flex>
  );
}
