import { Flex, Text, Image, Link, useBoolean } from "@chakra-ui/react";
import React from "react";

import type { Badge } from "~/types/badge";

import config from "~/config/app";
import chains from "~/config/chains";

import SpriteIcon from "~/components/shared/SpriteIcon";

import useIsMobile from "~/hooks/useIsMobile";

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
  const isMobile = useIsMobile();
  const [isHovered, setIsHovered] = useBoolean(false);

  const content = isHovered ? (
    <>
      <Flex flexDir="column" gap={2} px={3}>
        <Link
          href={`${chains[chainId].explorerUrl}/token/${address}?utm_source=merits-website&utm_medium=badge-card&utm_campaign=badge-name`}
          isExternal
          fontWeight="500"
        >
          {name}
        </Link>
        <Text fontSize="sm">
          Token ID:{" "}
          <Link
            href={`${chains[chainId].explorerUrl}/token/${address}/instance/${id}?utm_source=merits-website&utm_medium=badge-card&utm_campaign=badge-token-id`}
            isExternal
          >
            #{id}
          </Link>
        </Text>
      </Flex>
      <Text fontSize="sm" px={3} wordBreak="break-word">
        {description}
      </Text>
    </>
  ) : (
    <>
      <Flex
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
          alt={`${name} badge`}
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
      <Text fontWeight="500" px={3}>
        {name}
      </Text>
    </>
  );

  return (
    <Flex
      flexDir="column"
      h="300px"
      px={2}
      pt={isHovered ? 4 : 2}
      pb={4}
      gap={4}
      border="1px solid"
      borderColor="divider"
      borderRadius="lg"
      onMouseEnter={!isMobile ? setIsHovered.on : undefined}
      onMouseLeave={!isMobile ? setIsHovered.off : undefined}
      onClick={isMobile ? setIsHovered.toggle : undefined}
    >
      {content}
    </Flex>
  );
}
