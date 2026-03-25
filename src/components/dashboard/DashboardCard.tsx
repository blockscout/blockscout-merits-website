import {
  Flex,
  Text,
  useColorModeValue,
  Tag,
  ChakraStyledOptions,
  chakra,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import Skeleton from "~/chakra/Skeleton";

import HintPopover from "~/components/shared/HintPopover";

type Props = {
  title: string;
  description: string | React.ReactNode;
  hint?: string | React.ReactNode;
  availableSoon?: boolean;
  blurFilter?: boolean;
  direction?: "column" | "column-reverse" | "row";
  children?: React.ReactNode;
  label?: string;
  cardValueStyle?: ChakraStyledOptions;
  isLoading?: boolean;
  className?: string;
};

const DashboardCard = ({
  title,
  description,
  hint,
  availableSoon,
  blurFilter,
  direction = "column",
  children,
  label,
  cardValueStyle,
  isLoading,
  className,
}: Props) => {
  return (
    <Flex
      as="section"
      flexDirection={{
        base: direction === "row" ? "column" : direction,
        md: direction,
      }}
      justifyContent={
        direction === "column-reverse" ? "flex-end" : "flex-start"
      }
      p={{ base: 1.5, md: 2 }}
      border="1px solid"
      borderColor={useColorModeValue("gray.200", "whiteAlpha.200")}
      borderRadius="lg"
      gap={{ base: 1, md: direction === "row" ? 10 : 1 }}
      w={direction === "row" ? "full" : "auto"}
      flex={direction !== "row" ? 1 : "0 1 auto"}
      className={className}
    >
      <Flex
        flexDirection="column"
        gap={2}
        p={{ base: 1.5, md: 3 }}
        w={{ base: "full", md: direction === "row" ? "340px" : "full" }}
      >
        {label && (
          <Skeleton isLoaded={!isLoading} w="fit-content">
            <Tag>{label}</Tag>
          </Skeleton>
        )}
        <Flex alignItems="center" gap={2}>
          <Heading
            fontSize={{ base: "sm", md: "lg" }}
            fontWeight={{ base: "600", md: "500" }}
            lineHeight={1.5}
          >
            {title}
          </Heading>
          {hint && (
            <HintPopover
              label={hint}
              popoverContentProps={{
                w: "fit-content",
                maxW: { base: "calc(100vw - 8px)", lg: "210px" },
              }}
              popoverBodyProps={{ textAlign: "center" }}
            />
          )}
          {availableSoon && (
            <Tag colorScheme="blue" fontSize="sm">
              Available soon
            </Tag>
          )}
        </Flex>
        <Text as="div" fontSize="sm">
          {description}
        </Text>
      </Flex>
      <Flex
        alignItems="center"
        justifyContent="space-around"
        borderRadius={{ base: "lg", md: "8px" }}
        backgroundColor={useColorModeValue("gray.50", "whiteAlpha.50")}
        px={3}
        mt={direction === "column" ? "auto" : 0}
        h={{ base: "104px", md: "128px" }}
        filter="auto"
        blur={blurFilter ? "4px" : "0"}
        flex={direction === "row" ? 1 : "0 1 auto"}
        {...cardValueStyle}
      >
        {children}
      </Flex>
    </Flex>
  );
};

export default chakra(DashboardCard);
