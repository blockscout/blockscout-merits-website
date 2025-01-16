import { Flex, Text, Button, Image, useBoolean, Link } from "@chakra-ui/react";
import React from "react";
import { format } from "date-fns";

import type { Campaign } from "~/types/campaign";

import SpriteIcon from "~/components/shared/SpriteIcon";

import StatusLabel from "./StatusLabel";
import RewardLabel from "./RewardLabel";

import { getBgColor } from "./utils";

type Props = Campaign & { onClose: () => void };

export default function CampaignDetails({
  title,
  description,
  rewardType,
  rewardValue,
  imageUrl,
  startDate,
  endDate,
  checkTime,
  tasks,
  onClose,
}: Props) {
  const [isExpanded, setIsExpanded] = useBoolean(false);

  const bgColor = getBgColor(rewardType, rewardValue, endDate);
  const isExpired = new Date() > new Date(endDate);

  return (
    <Flex flexDir="column">
      <Flex alignItems="center" gap={3} mb={3}>
        <Button
          variant="unstyled"
          display="inline-flex"
          flexShrink={0}
          onClick={onClose}
        >
          <SpriteIcon
            name="arrows/west"
            boxSize={6}
            color={{ base: "blue.600", md: "gray.400" }}
          />
        </Button>
        <Text as="h2" fontSize={{ base: "lg", md: "32px" }} fontWeight="500">
          {title}
        </Text>
      </Flex>
      <Text
        fontSize="sm"
        mb={{ base: 3, md: 8 }}
        noOfLines={{ base: isExpanded ? undefined : 2, md: 9999 }}
      >
        {description}
      </Text>
      <Link
        display={{ base: "block", md: "none" }}
        onClick={setIsExpanded.toggle}
        fontWeight="500"
        _hover={{ textDecoration: "none" }}
        mb={6}
        alignSelf="flex-start"
      >
        Show {isExpanded ? "less" : "more"}
      </Link>
      <Flex
        flexDir={{ base: "column", md: "row" }}
        gap={{ base: 3, md: 6 }}
        alignItems="flex-start"
      >
        <Flex
          width={{ base: "full", md: "280px", lg: "378px" }}
          flexDir="column"
          gap={{ base: 3, md: 6 }}
        >
          <Flex
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
              width={rewardType === "badge" ? "130px" : "96px"}
              opacity={isExpired ? 0.3 : 1}
              filter={isExpired ? "grayscale(1)" : "none"}
            />
            <RewardLabel
              rewardType={rewardType}
              rewardValue={rewardValue}
              position="absolute"
              right="12px"
              top="12px"
            />
          </Flex>
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
                value: (
                  <StatusLabel
                    startDate={startDate}
                    endDate={endDate}
                    p={0}
                    h="auto"
                  />
                ),
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
                value: format(endDate, "dd.MM.yyyy"),
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
                {typeof value === "string" ? (
                  <Text fontSize="sm">{value}</Text>
                ) : (
                  value
                )}
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
                <Text fontWeight="500">
                  {index + 1}. {task.title}
                </Text>
                <Text fontSize="sm">{task.description}</Text>
              </Flex>
              {task.buttonLink && task.buttonText && (
                <Button
                  as="a"
                  href={task.buttonLink}
                  target="_blank"
                  rel="noopener"
                  variant="outline"
                  flexShrink={0}
                >
                  {task.buttonText}
                </Button>
              )}
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
