import { Flex, Text, Image } from "@chakra-ui/react";
import React from "react";

import Skeleton from "~/chakra/Skeleton";

type Props = {
  image: {
    src: string;
    width: string;
    height: string;
  };
  title: string;
  description: string | React.ReactNode;
  contentAfter?: React.ReactNode;
  maxW?: string;
};

export default function EmptyState({
  image,
  title,
  description,
  contentAfter,
  maxW,
}: Props) {
  return (
    <Flex
      w="full"
      justifyContent="center"
      py={12}
      px={2}
      border="1px solid"
      borderColor="divider"
      borderRadius="lg"
    >
      <Flex maxW={maxW} flexDir="column" alignItems="center">
        <Image
          src={image.src}
          alt="Empty state"
          w={image.width}
          h={image.height}
          mb={6}
          fallback={<Skeleton w={image.width} h={image.height} mb={6} />}
        />
        <Text fontSize="lg" fontWeight="medium" mb={2}>
          {title}
        </Text>
        <Text textAlign="center" mb={6}>
          {description}
        </Text>
        {contentAfter}
      </Flex>
    </Flex>
  );
}
