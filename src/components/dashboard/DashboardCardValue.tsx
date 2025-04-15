import { Flex, Text, Heading } from "@chakra-ui/react";
import React from "react";

import Skeleton from "~/chakra/Skeleton";

import MeritsIcon from "~/components/MeritsIcon";
import HintPopover from "~/components/shared/HintPopover";

type Props = {
  label?: string;
  value: number | string | undefined;
  withIcon?: boolean;
  hint?: string | React.ReactNode;
  isLoading?: boolean;
  bottomText?: string;
};

const DashboardCard = ({
  label,
  value,
  withIcon,
  hint,
  isLoading,
  bottomText,
}: Props) => (
  <Flex key={value} flexDirection="column" alignItems="center" gap={2}>
    {label && (
      <Flex alignItems="center" gap={1}>
        {hint && (
          <HintPopover
            label={hint}
            popoverContentProps={{
              w: "fit-content",
              maxW: { base: "calc(100vw - 8px)", lg: "400px" },
            }}
            popoverBodyProps={{ textAlign: "center" }}
          />
        )}
        <Text fontSize="xs" fontWeight="500" variant="secondary">
          {label}
        </Text>
      </Flex>
    )}
    <Skeleton
      isLoaded={!isLoading}
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={2}
      minW="100px"
    >
      {withIcon && <MeritsIcon boxSize={8} />}
      <Heading
        fontSize={{ base: "lg", md: "32px" }}
        lineHeight={1.5}
        fontWeight="500"
      >
        {value}
      </Heading>
    </Skeleton>
    {bottomText && (
      <Text fontSize="xs" fontWeight="500" variant="secondary">
        {bottomText}
      </Text>
    )}
  </Flex>
);

export default DashboardCard;
