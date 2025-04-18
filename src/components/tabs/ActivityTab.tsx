import {
  Flex,
  Link,
  Button,
  useDisclosure,
  Text,
  Alert,
  AlertIcon,
  Heading,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useMemo, useCallback, useState } from "react";

import Skeleton from "~/chakra/Skeleton";
import TasksFaq from "~/components/activity/TasksFaq";
import ExplorersModal from "~/components/activity/ExplorersModal";
import TaskDetailsModal from "~/components/activity/TaskDetailsModal";
import ActivityPassCard from "~/components/activity/ActivityPassCard";
import HintPopover from "~/components/shared/HintPopover";
import { apos, mdash } from "~/lib/htmlEntities";

import { useAppContext } from "~/contexts/app";
import useActivityQuery from "~/hooks/useActivityQuery";
import useInstancesQuery from "~/hooks/useInstancesQuery";
import useConfigQuery from "~/hooks/useConfigQuery";
import useCheckActivityPassQuery from "~/hooks/useCheckActivityPassQuery";
import useIsMobile from "~/hooks/useIsMobile";
import SpriteIcon from "../shared/SpriteIcon";
import MeritsIcon from "../MeritsIcon";

function getMaxAmount(rewards: Record<string, string> | undefined) {
  if (!rewards) {
    return 0;
  }

  const values = Object.values(rewards).map(Number);

  if (values.length === 0) {
    return 0;
  }

  return Math.max(...values);
}

export default function ActivityTab() {
  const { apiToken } = useAppContext();
  const activityQuery = useActivityQuery();
  const instancesQuery = useInstancesQuery();
  const configQuery = useConfigQuery();
  const checkActivityPassQuery = useCheckActivityPassQuery();
  const explorersModal = useDisclosure();
  const taskDetailsModal = useDisclosure();
  const isMobile = useIsMobile();
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number>(0);
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const bgColor = useColorModeValue("gray.50", "whiteAlpha.50");

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
      const amountDiff = Number((currentAmount - previousAmount).toFixed(2));
      const percentileDiff = Number(
        (currentPercentile - previousPercentile).toFixed(2),
      );

      return {
        amount: currentAmount,
        percentile: `${currentPercentile}%`,
        amountDiff: `${amountDiff >= 0 ? "+" : ""}${amountDiff}`,
        percentileDiff: `${percentileDiff >= 0 ? "+" : ""}${percentileDiff}%`,
      };
    };

    return {
      transactions: calcActivity("sent_transactions"),
      contracts: calcActivity("verified_contracts"),
      usage: calcActivity("blockscout_usage"),
    };
  }, [activityQuery.data]);

  const tasks = useMemo(
    () => [
      {
        title: "Blockscout activity",
        description: (
          <>
            Use Blockscout tools like{" "}
            <Link
              isExternal
              href="https://revoke.blockscout.com?utm_source=merits-website&utm_medium=transactions-task"
            >
              Revokescout
            </Link>{" "}
            or{" "}
            <Link
              isExternal
              href="https://swap.blockscout.com?utm_source=merits-website&utm_medium=transactions-task"
            >
              Swapscout
            </Link>
            , or{" "}
            <Link
              isExternal
              href="https://base.blockscout.com/address/0xd454688D0185aB166D0c4b28D57edeb475b416A8?tab=read_write_proxy&utm_source=merits-website&utm_medium=transactions-task"
            >
              interact with smart contracts
            </Link>{" "}
            to start earning Merits.
          </>
        ),
        percentile: activities.transactions?.percentile,
        percentileDiff: activities.transactions?.percentileDiff,
        amount: activities.transactions?.amount,
        amountDiff: activities.transactions?.amountDiff,
        maxAmount: getMaxAmount(
          configQuery.data?.rewards?.sent_transactions_activity_rewards,
        ),
      },
      {
        title: "Contracts verification",
        description: (
          <>
            Log in and{" "}
            <Link
              isExternal
              href="https://eth.blockscout.com/contract-verification?utm_source=merits-website&utm_medium=verify-contracts-task"
            >
              verify a smart contract
            </Link>{" "}
            on the Blockscout explorer to earn Merits.
          </>
        ),
        percentile: activities.contracts?.percentile,
        percentileDiff: activities.contracts?.percentileDiff,
        amount: activities.contracts?.amount,
        amountDiff: activities.contracts?.amountDiff,
        maxAmount: getMaxAmount(
          configQuery.data?.rewards?.verified_contracts_activity_rewards,
        ),
      },
      {
        title: "Blockscout usage",
        description: (
          <>
            Use Blockscout explorers in your daily routine {mdash} check
            transactions, explore addresses, or add tokens/networks to MetaMask
            via Blockscout.
          </>
        ),
        percentile: activities.usage?.percentile,
        percentileDiff: activities.usage?.percentileDiff,
        amount: activities.usage?.amount,
        amountDiff: activities.usage?.amountDiff,
        maxAmount: getMaxAmount(
          configQuery.data?.rewards?.blockscout_usage_activity_rewards,
        ),
      },
    ],
    [configQuery, activities],
  );

  const labels = {
    period: {
      text: `Period: ${period}`,
      hint: "Current Merits period. All metrics reset weekly",
    },
    performanceRank: {
      text: "Performance rank",
      hint: "Your rank within a task group compared to other users in the same period. Higher rank = more Merits.",
    },
    meritsEarned: {
      text: "Merits earned",
      hint: "Estimated Merits based on your current rank. Final amount may change",
    },
  };

  const labelComponents = Object.fromEntries(
    Object.entries(labels).map(([key, value], index) => [
      key,
      <Flex
        key={index}
        flex={1}
        alignItems="center"
        gap={1}
        _first={{ minW: { base: "auto", md: "200px" } }}
      >
        <Text
          fontSize={{ base: "sm", md: "xs" }}
          variant={{ base: "primary", md: "secondary" }}
          fontWeight="500"
        >
          {value.text}
        </Text>
        <HintPopover
          label={value.hint}
          popoverContentProps={{
            w: "fit-content",
            maxW: { base: "calc(100vw - 8px)", lg: "400px" },
          }}
          popoverBodyProps={{ textAlign: "center" }}
        />
      </Flex>,
    ]),
  );

  const openTaskDetails = useCallback(
    (index: number) => () => {
      setSelectedTaskIndex(index);
      taskDetailsModal.onOpen();
    },
    [taskDetailsModal],
  );

  const isActivityDataLoading =
    activityQuery.isPlaceholderData || checkActivityPassQuery.isPending;

  if (
    !apiToken ||
    (checkActivityPassQuery.data && !checkActivityPassQuery.data.is_valid)
  ) {
    return <ActivityPassCard />;
  }

  return (
    <>
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
      <Flex
        p={{ base: 1.5, md: 2 }}
        border="1px solid"
        borderColor={borderColor}
        borderRadius="lg"
        gap={{ base: 4, md: 10 }}
        flexDirection={{ base: "column", md: "row" }}
      >
        <Flex
          display={{ base: "contents", md: "flex" }}
          flexDirection="column"
          w="340px"
          p={3}
          pr={0}
        >
          <Flex flexDirection="column" p={{ base: 1.5, md: 0 }} pb={0}>
            <Heading
              fontSize={{ base: "sm", md: "lg" }}
              fontWeight={{ base: "600", md: "500" }}
              lineHeight={1.5}
              mb={2}
            >
              Your activity
            </Heading>
            <Text fontSize="sm" mb={{ base: 2, md: 4 }}>
              Use Blockscout and related products daily to earn Merits. Check
              each task for details and how to get started.
            </Text>
            <Flex alignItems="center" gap={3} mb={{ base: 0, md: 4 }}>
              <Button
                isLoading={instancesQuery.isLoading}
                onClick={explorersModal.onOpen}
              >
                Earn
              </Button>
              <Link
                isExternal
                href="https://docs.blockscout.com/using-blockscout/merits/activity-pass"
                fontSize="md"
                fontWeight="500"
                textAlign="center"
              >
                Learn more
              </Link>
            </Flex>
          </Flex>
          <Flex
            flexDirection="column"
            gap={2.5}
            mt="auto"
            order={{ base: 3, md: "auto" }}
            px={{ base: 1.5, md: 0 }}
          >
            <SpriteIcon name="status/warning" boxSize={6} color="gray.500" />
            <Text fontSize="sm">
              <chakra.span fontWeight="600">
                Your current Merit count is not final!
              </chakra.span>
              <br />
              Merits are calculated based on the activity of all users and may
              increase or decrease by the end of the weekly period.
            </Text>
          </Flex>
        </Flex>
        <Flex
          display={{ base: "flex", md: "none" }}
          justifyContent="space-between"
          px={3}
        >
          <Flex alignItems="center" gap={1}>
            <Text fontSize="sm" fontWeight="500">
              Period
            </Text>
            <HintPopover
              label={labels.period.hint}
              popoverContentProps={{
                w: "fit-content",
                maxW: { base: "calc(100vw - 8px)", lg: "400px" },
              }}
              popoverBodyProps={{ textAlign: "center" }}
            />
          </Flex>
          <Text fontSize="sm" fontWeight="500" variant="secondary">
            {period}
          </Text>
        </Flex>
        <Flex
          display={{ base: "contents", md: "flex" }}
          flex={1}
          flexDirection="column"
          gap={1}
        >
          <Flex p={3} gap={8} display={{ base: "none", md: "flex" }}>
            {Object.values(labelComponents)}
          </Flex>
          <Flex flexDirection="column" gap={{ base: 1.5, md: 1 }}>
            {tasks.map((item, index) => (
              <Flex
                key={index}
                flexDirection={{ base: "column", md: "row" }}
                px={3}
                py={4}
                gap={{ base: 6, md: 8 }}
                borderRadius={{ base: "lg", md: "8px" }}
                backgroundColor={bgColor}
              >
                <Flex
                  flex={1}
                  flexDirection={{ base: "row", md: "column" }}
                  gap={2}
                  alignItems={{ base: "center", md: "flex-start" }}
                  justifyContent={{ base: "space-between", md: "flex-start" }}
                  minW={{ base: "auto", md: "200px" }}
                >
                  <Text fontSize="sm" fontWeight={{ base: "700", md: "500" }}>
                    {item.title}
                  </Text>
                  <Link
                    fontSize={{ base: "sm", md: "xs" }}
                    fontWeight={{ base: "400", md: "500" }}
                    onClick={openTaskDetails(index)}
                  >
                    Task details
                  </Link>
                </Flex>
                <Flex display={{ base: "flex", md: "contents" }} gap={8}>
                  <Flex
                    flex={1}
                    flexDirection="column"
                    gap={2}
                    alignItems="flex-start"
                  >
                    <Flex display={{ base: "flex", md: "none" }}>
                      {labelComponents.performanceRank}
                    </Flex>
                    <Skeleton isLoaded={!isActivityDataLoading}>
                      <Heading
                        fontSize={{ base: "sm", md: "lg" }}
                        fontWeight={{ base: "600", md: "500" }}
                        lineHeight={1.5}
                      >
                        {item.percentile}
                      </Heading>
                    </Skeleton>
                    <Skeleton isLoaded={!isActivityDataLoading}>
                      <Text
                        fontSize={{ base: "sm", md: "xs" }}
                        variant="secondary"
                        fontWeight="500"
                      >
                        {item.percentileDiff} vs{" "}
                        {isMobile ? "prev." : "previous"} week
                      </Text>
                    </Skeleton>
                  </Flex>
                  <Flex
                    flex={1}
                    flexDirection="column"
                    gap={2}
                    alignItems="flex-start"
                  >
                    <Flex display={{ base: "flex", md: "none" }}>
                      {labelComponents.meritsEarned}
                    </Flex>
                    <Skeleton
                      isLoaded={!isActivityDataLoading}
                      display="flex"
                      alignItems="center"
                    >
                      <MeritsIcon boxSize={6} mr={2} />
                      <Heading
                        fontSize={{ base: "sm", md: "lg" }}
                        fontWeight={{ base: "600", md: "500" }}
                        lineHeight={1.5}
                        mr={{ base: 0, md: 2 }}
                      >
                        {item.amount}
                      </Heading>
                      <Text
                        fontSize="sm"
                        color="gray.400"
                        fontWeight="500"
                        alignSelf="flex-end"
                        display={{ base: "none", md: "inline" }}
                      >
                        /{item.maxAmount}
                      </Text>
                      <Heading
                        fontSize="sm"
                        fontWeight="600"
                        lineHeight={1.5}
                        display={{ base: "inline", md: "none" }}
                        color="text_secondary"
                      >
                        /{item.maxAmount}
                      </Heading>
                    </Skeleton>
                    <Skeleton isLoaded={!isActivityDataLoading}>
                      <Text
                        fontSize={{ base: "sm", md: "xs" }}
                        variant="secondary"
                        fontWeight="500"
                      >
                        {item.amountDiff} vs {isMobile ? "prev." : "previous"}{" "}
                        week
                      </Text>
                    </Skeleton>
                  </Flex>
                </Flex>
              </Flex>
            ))}
          </Flex>
          <Flex p={{ base: 1.5, md: 3 }} order={{ base: 4, md: "auto" }}>
            <Text fontSize="xs" variant="secondary" fontWeight="500">
              Metrics are not updated in real time. Please allow up to one hour
              for your Performance Rank and earned Merits to reflect recent
              activity. If you experience any issues, feel free to reach out on{" "}
              <Link isExternal href="https://discord.gg/blockscout">
                Discord
              </Link>
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <TasksFaq />
      <ExplorersModal
        isOpen={explorersModal.isOpen}
        onClose={explorersModal.onClose}
        items={instancesQuery.data?.items}
      />
      <TaskDetailsModal
        isOpen={taskDetailsModal.isOpen}
        onClose={taskDetailsModal.onClose}
        title={tasks[selectedTaskIndex].title}
      >
        {tasks[selectedTaskIndex].description}
      </TaskDetailsModal>
    </>
  );
}
