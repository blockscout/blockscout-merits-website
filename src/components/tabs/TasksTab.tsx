import {
  Flex,
  Link,
  Button,
  useDisclosure,
  Text,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useMemo } from "react";

import DashboardCard from "~/components/dashboard/DashboardCard";
import DashboardCardValue from "~/components/dashboard/DashboardCardValue";
import Markdown from "~/components/shared/Markdown";
import TasksFaq from "~/components/tasks/TasksFaq";
import ExplorersModal from "~/components/tasks/ExplorersModal";
import { apos } from "~/lib/htmlEntities";

import { useAppContext } from "~/contexts/app";
import useActivityQuery from "~/hooks/useActivityQuery";
import useInstancesQuery from "~/hooks/useInstancesQuery";

export default function TasksTab() {
  const { apiToken } = useAppContext();
  const activityQuery = useActivityQuery();
  const instancesQuery = useInstancesQuery();
  const explorersModal = useDisclosure();

  const isLoading = activityQuery.isPlaceholderData && Boolean(apiToken);

  const period = useMemo(() => {
    if (!activityQuery.data || !apiToken) {
      return undefined;
    }

    const item = activityQuery.data.items[0];
    const startDate = format(item.date, "MMM d");
    const endDate = format(item.end_date, "MMM d, yyyy");

    return `${startDate} - ${endDate}`;
  }, [activityQuery, apiToken]);

  const activities = useMemo(() => {
    const { items, last_week } = activityQuery.data || {};

    const calcActivity = (type: string) => {
      const current = items?.find((item) => item.activity === type);
      const previous = last_week?.find((item) => item.activity === type);

      const currentAmount = Number(current?.amount || 0);
      const previousAmount = Number(previous?.amount || 0);
      const currentPercentile = Number(current?.percentile || 0);
      const previousPercentile = Number(previous?.percentile || 0);
      const amountDiff = currentAmount - previousAmount;
      const percentileDiff = currentPercentile - previousPercentile;

      return {
        amount: currentAmount,
        percentile: `${currentPercentile}%`,
        amountDiff: `${amountDiff >= 0 ? "+" : ""}${amountDiff}`,
        percentileDiff: `${percentileDiff >= 0 ? "+" : ""}${percentileDiff}%`,
      };
    };

    return {
      usage: calcActivity("blockscout_usage"),
      contracts: calcActivity("verified_contracts"),
    };
  }, [activityQuery.data]);

  return (
    <>
      {apiToken && (
        <Alert
          status="info"
          size="xs"
          colorScheme="gray"
          mb={6}
          px={3}
          py={2}
          w="fit-content"
          borderRadius="base"
        >
          <AlertIcon boxSize={4} />
          <Text fontWeight="600" fontSize={{ base: "sm", md: "md" }}>
            Ensure you{apos}re logged into your Merits account on the Blockscout
            Explorer to receive Merits for all your activities
          </Text>
        </Alert>
      )}
      <Flex gap={6} flexDirection={{ base: "column", md: "row" }}>
        {[
          {
            title: "Weekly Blockscout activity",
            description: `
              Grab your [Activity pass](https://merits.blockscout.com/?tab=redeem&id=activity-pass&utm_source=merits-website&utm_medium=transactions-task)
              then use [Revokescout](https://revoke.blockscout.com?utm_source=merits-website&utm_medium=transactions-task),
              [Swapscout](https://swap.blockscout.com?utm_source=merits-website&utm_medium=transactions-task),
              or [interact with smart contracts](https://base.blockscout.com/address/0xd454688D0185aB166D0c4b28D57edeb475b416A8?tab=read_write_proxy&utm_source=merits-website&utm_medium=transactions-task)
              to earn extra Merits each week.
          `.trim(),
            percentile: activities.usage?.percentile,
            percentileDiff: activities.usage?.percentileDiff,
            amount: activities.usage?.amount,
            amountDiff: activities.usage?.amountDiff,
          },
          {
            title: "Weekly contracts verification",
            description: `
              Verified contracts are so important for transparency. Grab your
              [Activity pass](https://merits.blockscout.com/?tab=redeem&id=activity-pass&utm_source=merits-website&utm_medium=transactions-task)
              and start verifying contracts on Blockscout to receive Merits!
            `.trim(),
            percentile: activities.contracts?.percentile,
            percentileDiff: activities.contracts?.percentileDiff,
            amount: activities.contracts?.amount,
            amountDiff: activities.contracts?.amountDiff,
          },
        ].map((item, index) => (
          <DashboardCard
            key={index}
            label={period}
            title={item.title}
            description={
              <Flex flexDir="column" gap={3}>
                <Markdown>{item.description}</Markdown>
                <Flex alignItems="center" gap={3}>
                  <Button
                    flex={{ base: 1, md: "none" }}
                    isLoading={instancesQuery.isPending}
                    onClick={explorersModal.onOpen}
                  >
                    Earn
                  </Button>
                  <Link
                    fontSize="md"
                    fontWeight="500"
                    textAlign="center"
                    flex={{ base: 1, md: "none" }}
                    px={{ base: 4, md: 0 }}
                  >
                    Learn more
                  </Link>
                </Flex>
              </Flex>
            }
            blurFilter={!apiToken}
            isLoading={isLoading}
          >
            <DashboardCardValue
              label="Performance rank"
              value={item.percentile}
              hint="Performance rank"
              bottomText={`${item.percentileDiff} vs previous week`}
              isLoading={isLoading}
            />
            <DashboardCardValue
              label="Merits earned"
              value={item.amount}
              withIcon
              hint="Merits earned"
              bottomText={`${item.amountDiff} vs previous week`}
              isLoading={isLoading}
            />
          </DashboardCard>
        ))}
      </Flex>
      <TasksFaq />
      <ExplorersModal
        isOpen={explorersModal.isOpen}
        onClose={explorersModal.onClose}
        items={instancesQuery.data?.items}
      />
    </>
  );
}
