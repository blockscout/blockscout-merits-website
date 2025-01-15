import { Flex, Text, chakra } from "@chakra-ui/react";
import React from "react";

import type { Campaign } from "~/types/campaign";

import SpriteIcon from "~/components/shared/SpriteIcon";

type Props = {
  rewardType: Campaign["rewardType"];
  rewardValue: Campaign["rewardValue"];
  className?: string;
};

const RewardLabel = ({ rewardType, rewardValue, className }: Props) => {
  const text = rewardType === "merits" ? `${rewardValue} Merits` : "Badge";
  return (
    <Flex
      className={className}
      px={2}
      h="28px"
      gap={2}
      alignItems="center"
      borderRadius="base"
      bgColor="white"
    >
      <SpriteIcon name="present" boxSize={5} color="blackAlpha.800" />
      <Text fontSize="sm">{text}</Text>
    </Flex>
  );
};

export default chakra(RewardLabel);
