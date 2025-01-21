import { Flex, Text, Button, Image, useBoolean, Link } from "@chakra-ui/react";
import React from "react";
import { format } from "date-fns";

import type { Campaign } from "~/types/campaign";

import SpriteIcon from "~/components/shared/SpriteIcon";
import Skeleton from "~/chakra/Skeleton";

import StatusLabel from "./StatusLabel";
import RewardLabel from "./RewardLabel";

import { getBgColor } from "./utils";

type Props = Campaign & { isLoading: boolean; onClose: () => void };

export default function CampaignDetails({
  title,
  description,
  rewardType,
  rewardValue,
  imageUrl,
  status,
  startDate,
  endDate,
  checkTime,
  tasks,
  isLoading,
  onClose,
}: Props) {
  const [isExpanded, setIsExpanded] = useBoolean(false);

  const bgColor = getBgColor(rewardType, rewardValue, status);

  return (
    <Flex flexDir="column">
      <Flex alignItems="flex-start" gap={3} mb={3}>
        <Button
          variant="unstyled"
          display="inline-flex"
          flexShrink={0}
          onClick={onClose}
          height={{ base: "27px", md: "48px" }}
        >
          <SpriteIcon
            name="arrows/west"
            boxSize={6}
            color={{ base: "blue.600", md: "gray.400" }}
          />
        </Button>
        <Skeleton isLoaded={!isLoading}>
          <Text as="h2" fontSize={{ base: "lg", md: "32px" }} fontWeight="500">
            {title}
          </Text>
        </Skeleton>
      </Flex>
      <Skeleton isLoaded={!isLoading} mb={{ base: 3, md: 8 }}>
        <Text
          fontSize="sm"
          noOfLines={{ base: isExpanded ? undefined : 2, md: 9999 }}
        >
          {description}
        </Text>
      </Skeleton>
      <Skeleton
        isLoaded={!isLoading}
        display={{ base: "block", md: "none" }}
        mb={6}
        width="fit-content"
      >
        <Link
          onClick={setIsExpanded.toggle}
          fontWeight="500"
          _hover={{ textDecoration: "none" }}
          alignSelf="flex-start"
        >
          Show {isExpanded ? "less" : "more"}
        </Link>
      </Skeleton>
      <Flex
        flexDir={{ base: "column", md: "row" }}
        gap={{ base: 3, md: 6 }}
        alignItems={{ base: "stretch", md: "flex-start" }}
      >
        <Flex
          width={{ base: "full", md: "280px", lg: "378px" }}
          flexDir="column"
          gap={{ base: 3, md: 6 }}
        >
          <Skeleton
            isLoaded={!isLoading}
            as={Flex}
            w="full"
            h="240px"
            alignItems="center"
            justifyContent="center"
            borderRadius="lg"
            bgColor={bgColor}
            position="relative"
          >
            <Image
              src={imageUrl}
              alt={`${title} image`}
              width="130px"
              opacity={status === "expired" ? 0.3 : 1}
              filter={status === "expired" ? "grayscale(1)" : "none"}
            />
            <RewardLabel
              rewardType={rewardType}
              rewardValue={rewardValue}
              position="absolute"
              right="12px"
              top="12px"
            />
          </Skeleton>
          <Flex
            flexDir="column"
            gap={4}
            p={5}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="lg"
          >
            {[
              {
                icon: "cardio" as const,
                title: "Status",
                value: <StatusLabel status={status} p={0} h="auto" />,
              },
              {
                icon: "present" as const,
                title: "Rewards",
                value:
                  rewardType === "merits" ? `${rewardValue} Merits` : "Badge",
              },
              {
                icon: "clock" as const,
                title: "Start date",
                value: format(startDate, "dd.MM.yyyy"),
              },
              {
                icon: "clock" as const,
                title: "End date",
                value: endDate ? format(endDate, "dd.MM.yyyy") : "Unlimited",
              },
              {
                icon: "pie-chart" as const,
                title: "Distribution",
                value: checkTime,
              },
            ].map(({ icon, title, value }) => (
              <Flex
                key={title}
                alignItems="center"
                justifyContent="space-between"
                h="24px"
              >
                <Flex alignItems="center" gap={2}>
                  <SpriteIcon name={icon} boxSize={5} color="gray.500" />
                  <Text fontSize="sm" color="gray.500">
                    {title}
                  </Text>
                </Flex>
                <Skeleton isLoaded={!isLoading}>
                  {typeof value === "string" ? (
                    <Text fontSize="sm">{value}</Text>
                  ) : (
                    value
                  )}
                </Skeleton>
              </Flex>
            ))}
          </Flex>
        </Flex>
        <Flex
          flex={1}
          flexDir="column"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="lg"
        >
          {tasks.map((task, index) => (
            <Flex
              key={index}
              flexDir={{ base: "column", md: "row" }}
              alignItems={{ base: "stretch", md: "center" }}
              justifyContent="space-between"
              gap={4}
              p={5}
              borderBottom="1px solid"
              borderColor="gray.200"
              _last={{ borderBottom: "none" }}
            >
              <Flex flexDir="column" gap={2}>
                <Skeleton isLoaded={!isLoading} as={Text} fontWeight="500">
                  {index + 1}. {task.title}
                </Skeleton>
                <Skeleton isLoaded={!isLoading} as={Text} fontSize="sm">
                  {task.description}
                </Skeleton>
              </Flex>
              {task.buttonLink && task.buttonText && (
                <Skeleton isLoaded={!isLoading}>
                  <Button
                    as="a"
                    href={task.buttonLink}
                    target="_blank"
                    rel="noopener"
                    variant="outline"
                    flexShrink={0}
                    w={{ base: "full", md: "auto" }}
                  >
                    {task.buttonText}
                  </Button>
                </Skeleton>
              )}
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
