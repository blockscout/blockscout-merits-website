import { Flex, Text, Image, Link } from "@chakra-ui/react";
import React from "react";

import type { Campaign } from "~/types/campaign";

import StatusLabel from "./StatusLabel";
import RewardLabel from "./RewardLabel";

function getBgColor(
  rewardType: Campaign["rewardType"],
  rewardValue: string,
  endDate: string,
) {
  if (new Date() > new Date(endDate)) {
    return "rgba(16, 17, 18, 0.06)";
  }

  if (rewardType === "merits") {
    return "#DFE8F5";
  }

  if (rewardType === "badge") {
    return rewardValue === "epic" ? "#FCE4AF" : "#EFE1FF";
  }
}

type Props = Campaign;

export default function CampaignCard({
  title,
  description,
  rewardType,
  rewardValue,
  imageUrl,
  startDate,
  endDate,
}: Props) {
  const bgColor = getBgColor(rewardType, rewardValue, endDate);
  const isExpired = new Date() > new Date(endDate);

  return (
    <Flex
      flexDir="column"
      px={2}
      pt={2}
      pb={4}
      gap={4}
      border="1px solid"
      borderColor="divider"
      borderRadius="lg"
      height="100%"
    >
      <Flex
        w="full"
        h="224px"
        alignItems="center"
        justifyContent="center"
        borderRadius="base"
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
        <StatusLabel
          startDate={startDate}
          endDate={endDate}
          position="absolute"
          left="12px"
          top="12px"
        />
        <RewardLabel
          rewardType={rewardType}
          rewardValue={rewardValue}
          position="absolute"
          right="12px"
          top="12px"
        />
      </Flex>
      <Flex flexDir="column" px={3} gap={2} flex={1}>
        <Text fontWeight="600" noOfLines={2}>
          {title}
        </Text>
        <Text fontSize="sm" noOfLines={2}>
          {description}
        </Text>
        <Link fontSize="sm" fontWeight="500" marginTop="auto">
          Details
        </Link>
      </Flex>
    </Flex>
  );
}
