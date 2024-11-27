import { Flex, Text, Image } from "@chakra-ui/react";
import React from "react";

type Props = {
  imageSrc: string;
  imageWidth: string;
  title: string;
  description: string | React.ReactNode;
  contentAfter?: React.ReactNode;
  maxW?: string;
};

export default function EmptyState({
  imageSrc,
  imageWidth,
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
        <Image src={imageSrc} alt="Empty state" w={imageWidth} mb={6} />
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
