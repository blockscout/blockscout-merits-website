import { Flex, Link, Button } from "@chakra-ui/react";

import DashboardCard from "~/components/dashboard/DashboardCard";
import DashboardCardValue from "~/components/dashboard/DashboardCardValue";
import Markdown from "~/components/shared/Markdown";

export default function TasksTab() {
  const buttons = (
    <Flex alignItems="center" gap={3}>
      <Button flex={{ base: 1, md: "none" }}>Earn</Button>
      <Link
        href=""
        fontSize="md"
        fontWeight="500"
        textAlign="center"
        flex={{ base: 1, md: "none" }}
        px={{ base: 4, md: 0 }}
      >
        Learn more
      </Link>
    </Flex>
  );

  return (
    <Flex gap={6} flexDirection={{ base: "column", md: "row" }}>
      <DashboardCard
        label="Jan 15 - Jan 22 2025"
        title="Weekly Blockscout activity"
        description={
          <Flex flexDir="column" gap={3}>
            <Markdown>
              Grab your [Activity
              pass](https://merits.blockscout.com/?tab=redeem&id=activity-pass&utm_source=merits-website&utm_medium=transactions-task)
              then use
              [Revokescout](https://revoke.blockscout.com?utm_source=merits-website&utm_medium=transactions-task),
              [Swapscout](https://swap.blockscout.com?utm_source=merits-website&utm_medium=transactions-task),
              or [interact with smart
              contracts](https://base.blockscout.com/address/0xd454688D0185aB166D0c4b28D57edeb475b416A8?tab=read_write_proxy&utm_source=merits-website&utm_medium=transactions-task)
              to earn extra Merits each week.
            </Markdown>
            {buttons}
          </Flex>
        }
      >
        <DashboardCardValue
          label="Performance rank"
          value="50%"
          hint="Performance rank"
          bottomText="-10% vs previous week"
        />
        <DashboardCardValue
          label="Merits earned"
          value="800"
          withIcon
          hint="Merits earned"
          bottomText="-22 vs previous week"
        />
      </DashboardCard>
      <DashboardCard
        label="Jan 15 - Jan 22 2025"
        title="Weekly contracts verification"
        description={
          <Flex flexDir="column" gap={3}>
            <Markdown>
              Verified contracts are so important for transparency. Grab your
              [Activity
              pass](https://merits.blockscout.com/?tab=redeem&id=activity-pass&utm_source=merits-website&utm_medium=transactions-task)
              and start verifying contracts on Blockscout to receive Merits!
            </Markdown>
            {buttons}
          </Flex>
        }
      >
        <DashboardCardValue
          label="Performance rank"
          value="45%"
          hint="Performance rank"
          bottomText="-10% vs previous week"
        />
        <DashboardCardValue
          label="Merits earned"
          value="500"
          withIcon
          hint="Merits earned"
          bottomText="-22 vs previous week"
        />
      </DashboardCard>
    </Flex>
  );
}
