import { Flex, Text } from "@chakra-ui/react";
import React from "react";

import Skeleton from "~/chakra/Skeleton";

import MeritsIcon from "~/components/MeritsIcon";

type Props = {
  label: string;
  value: number | string | undefined;
  withIcon?: boolean;
  isLoading?: boolean;
};

const DashboardCard = ({ value, withIcon, isLoading }: Props) => (
  <Flex key={value} flexDirection="column" alignItems="center" gap={2}>
    <Skeleton
      isLoaded={!isLoading}
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={2}
      minW="100px"
    >
      {withIcon && <MeritsIcon boxSize={8} />}
      <Text
        fontSize={{ base: "18px", md: "32px" }}
        lineHeight={{ base: "24px", md: 1.25 }}
        fontWeight="500"
      >
        {value}
      </Text>
    </Skeleton>
  </Flex>
);

export default DashboardCard;
