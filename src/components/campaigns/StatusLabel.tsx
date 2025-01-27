import { Flex, Box, Text, chakra } from "@chakra-ui/react";
import React from "react";

import type { Campaign } from "~/types/campaign";

import capitalizeFirstLetter from "~/lib/capitalizeFirstLetter";

type Props = {
  status: Campaign["status"];
  className?: string;
};

const colors = {
  upcoming: "blue.400",
  active: "green.500",
  expired: "blackAlpha.500",
};

const StatusLabel = ({ status, className }: Props) => (
  <Flex
    className={className}
    px={2}
    h="28px"
    gap={2}
    alignItems="center"
    borderRadius="base"
    bgColor="white"
  >
    <Box w={2} h={2} borderRadius="full" bgColor={colors[status]} />
    <Text fontSize="sm">{capitalizeFirstLetter(status)}</Text>
  </Flex>
);

export default chakra(StatusLabel);
