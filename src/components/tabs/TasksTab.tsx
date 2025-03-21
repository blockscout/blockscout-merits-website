import {
  Flex,
  Link,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Image,
  Box,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useMemo } from "react";

import DashboardCard from "~/components/dashboard/DashboardCard";
import DashboardCardValue from "~/components/dashboard/DashboardCardValue";
import Markdown from "~/components/shared/Markdown";
import { apos } from "~/lib/htmlEntities";

import { useAppContext } from "~/contexts/app";
import useActivityQuery from "~/hooks/useActivityQuery";
import useInstancesQuery from "~/hooks/useInstancesQuery";
import useIsMobile from "~/hooks/useIsMobile";

export default function TasksTab() {
  const { apiToken } = useAppContext();
  const activityQuery = useActivityQuery();
  const instancesQuery = useInstancesQuery();
  const explorersModal = useDisclosure();
  const isMobile = useIsMobile();

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
      <Modal
        isOpen={explorersModal.isOpen}
        onClose={explorersModal.onClose}
        size={isMobile ? "full" : "md"}
        isCentered
        autoFocus={false}
      >
        <ModalOverlay />
        <ModalContent width="400px" p={6}>
          <ModalHeader fontWeight="500" textStyle="h3" mb={4} pr={12}>
            Choose explorer
          </ModalHeader>
          <ModalCloseButton top={6} right={6} />
          <ModalBody mb={0}>
            <Flex flexDir="column" gap={6}>
              <Text>
                Choose Blockscout explorer that you want to interact with and
                earn Merits
              </Text>
              <Flex flexWrap="wrap" gap={2}>
                {instancesQuery.data?.instances.map((instance) => (
                  <Link
                    key={instance.chain_id}
                    href={instance.domain}
                    isExternal
                    _hover={{ textDecoration: "none" }}
                  >
                    <Flex
                      gap={2}
                      alignItems="center"
                      p={2}
                      bgColor="blue.50"
                      borderRadius="base"
                    >
                      <Image
                        src={instance.logo_url}
                        alt={instance.name}
                        boxSize={5}
                        flexShrink={0}
                        fallback={
                          <Box
                            boxSize={5}
                            borderRadius="full"
                            bg="gray.200"
                            flexShrink={0}
                          />
                        }
                      />
                      <Text fontSize="sm" fontWeight="500">
                        {instance.name}
                      </Text>
                    </Flex>
                  </Link>
                ))}
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
