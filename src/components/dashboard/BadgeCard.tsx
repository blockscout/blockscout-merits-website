import { Flex, Text, Image, Link } from "@chakra-ui/react";
import React, { useState } from "react";

import type { Badge } from "~/types/badge";

import config from "~/config/app";
import chains from "~/config/chains";

import SpriteIcon from "~/components/shared/SpriteIcon";

type Props = Badge;

const colors: Record<Badge["rarity"], { bg: string; text: string }> = {
  regular: {
    bg: "#DFE8F5",
    text: "#607793",
  },
  rare: {
    bg: "#D2E5FE",
    text: "#0E3FA7",
  },
  "super-rare": {
    bg: "#C8EBDF",
    text: "#136F4F",
  },
  legend: {
    bg: "#EFE1FF",
    text: "#6B3EA3",
  },
  epic: {
    bg: "#FCE4AF",
    text: "#A64B00",
  },
};

export default function BadgeCard({
  chainId,
  id,
  collectionId,
  address,
  name,
  description,
  rarity,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Flex
      flexDir="column"
      h="320px"
      px={2}
      pt={isHovered ? 4 : 2}
      pb={4}
      gap={4}
      border="1px solid"
      borderColor="divider"
      borderRadius="lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Flex
        display={isHovered ? "none" : "flex"}
        w="full"
        h="224px"
        alignItems="center"
        justifyContent="center"
        borderRadius="base"
        bgColor={colors[rarity].bg}
        position="relative"
      >
        <Image
          src={`${config.images.baseUrl}/${collectionId}/${rarity}.png`}
          width="130px"
        />
        <Flex
          position="absolute"
          top="12px"
          left="12px"
          alignItems="center"
          gap={2}
          color={colors[rarity].text}
        >
          <SpriteIcon name="star" boxSize={5} />
          <Text fontSize="sm">
            {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
          </Text>
        </Flex>
      </Flex>
      <Flex flexDir="column" gap={2} px={3}>
        <Link
          href={`${chains[chainId].explorerUrl}/token/${address}`}
          isExternal
          fontWeight="500"
        >
          {name}
        </Link>
        <Text fontSize="sm">
          Token ID:{" "}
          <Link
            href={`${chains[chainId].explorerUrl}/token/${address}/instance/${id}`}
            isExternal
          >
            #{id}
          </Link>
        </Text>
      </Flex>
      <Text
        fontSize="sm"
        px={3}
        wordBreak="break-word"
        display={isHovered ? "flex" : "none"}
      >
        {description}
      </Text>
    </Flex>
  );
}
