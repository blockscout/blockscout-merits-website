import { Flex, Box, Text, chakra } from "@chakra-ui/react";
import React from "react";

type Props = {
  startDate: string;
  endDate: string | undefined;
  className?: string;
};

const StatusLabel = ({ startDate, endDate, className }: Props) => {
  const now = new Date();
  let text;
  let color;

  if (now < new Date(startDate)) {
    text = "Upcoming";
    color = "blue.400";
  } else if (endDate && now > new Date(endDate)) {
    text = "Expired";
    color = "blackAlpha.500";
  } else {
    text = "Active";
    color = "green.500";
  }

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
      <Box w={2} h={2} borderRadius="full" bgColor={color} />
      <Text fontSize="sm">{text}</Text>
    </Flex>
  );
};

export default chakra(StatusLabel);
