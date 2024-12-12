import { Flex, Text, Image, useBreakpointValue } from "@chakra-ui/react";
import React from "react";

import Skeleton from "~/chakra/Skeleton";

type Props = {
  image: {
    src: string;
    width: number;
    height: number;
  };
  title: string;
  description: string | React.ReactNode;
  contentAfter?: React.ReactNode;
  maxW?: string;
  noBorder?: boolean;
};

export default function EmptyState({
  image,
  title,
  description,
  contentAfter,
  maxW,
  noBorder,
}: Props) {
  const width = useBreakpointValue({
    base: Math.round(image.width / 1.5),
    md: image.width,
  });
  const height = useBreakpointValue({
    base: Math.round(image.height / 1.5),
    md: image.height,
  });

  return (
    <Flex
      w="full"
      justifyContent="center"
      py={12}
      px={2}
      border={noBorder ? "none" : "1px solid"}
      borderColor="divider"
      borderRadius="lg"
    >
      <Flex maxW={maxW} flexDir="column" alignItems="center">
        <Image
          src={image.src}
          alt="Empty state"
          w={width}
          h={height}
          mb={6}
          fallback={<Skeleton w={width} h={height} mb={6} />}
        />
        <Text fontSize="lg" fontWeight="medium" mb={2}>
          {title}
        </Text>
        <Text fontSize={{ base: "sm", md: "base" }} textAlign="center" mb={6}>
          {description}
        </Text>
        {contentAfter}
      </Flex>
    </Flex>
  );
}
