import { Flex, Text, Image, Link } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { upperFirst } from "lodash";

import type { Campaign } from "~/types/campaign";

import LabelWithIcon from "~/components/shared/LabelWithIcon";

import StatusLabel from "./StatusLabel";

import { getBgColor } from "./utils";

type Props = Campaign & { onClick: (id: string) => void };

export default function CampaignCard({
  id,
  title,
  description,
  rewardType,
  rewardValue,
  imageUrl,
  status,
  onClick,
}: Props) {
  const bgColor = getBgColor(rewardType, rewardValue, status);

  const handleClick = useCallback(() => {
    onClick(id);
  }, [id, onClick]);

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
      cursor="pointer"
      onClick={handleClick}
      role="group"
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
          width="130px"
          opacity={status === "expired" ? 0.3 : 1}
          filter={status === "expired" ? "grayscale(1)" : "none"}
          transitionProperty="transform"
          transitionDuration="normal"
          transitionTimingFunction="ease"
          _groupHover={{ base: {}, lg: { transform: "scale(1.1)" } }}
        />
        <StatusLabel
          status={status}
          position="absolute"
          left="12px"
          top="12px"
        />
        <LabelWithIcon
          icon="present"
          text={
            rewardType === "merits"
              ? `${rewardValue} Merits`
              : upperFirst(rewardType)
          }
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
        <Link
          fontSize="sm"
          fontWeight="500"
          marginTop="auto"
          onClick={handleClick}
        >
          Details
        </Link>
      </Flex>
    </Flex>
  );
}
