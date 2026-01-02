import { Flex, Text, Image, Link, useBoolean, Box } from "@chakra-ui/react";
import React from "react";

import type { Badge } from "~/types/badge";

import config from "~/config/app";

import SpriteIcon from "~/components/shared/SpriteIcon";

import useIsMobile from "~/hooks/useIsMobile";

type Props = Badge;

const colors: Record<Badge["rarity"], { bg: string; text: string }> = {
  regular: {
    bg: "#d9e3f3",
    text: "#607793",
  },
  rare: {
    bg: "#cce0fd",
    text: "#0E3FA7",
  },
  "super-rare": {
    bg: "#bee7d9",
    text: "#136F4F",
  },
  legend: {
    bg: "#eddcfd",
    text: "#6B3EA3",
  },
  epic: {
    bg: "#fde1b4",
    text: "#A64B00",
  },
  mythic: {
    bg: "linear-gradient(126deg, #FFEFD3 20%, #E5CEFF 80%)",
    text: "#9C630C",
  },
};

export default function BadgeCard({
  id,
  collectionId,
  address,
  name,
  description,
  rarity,
  isAnimated,
  explorerUrl,
}: Props) {
  const isMobile = useIsMobile();
  const [isHovered, setIsHovered] = useBoolean(false);

  const utmParams = `utm_source=merits-website&utm_medium=badge-card&utm_campaign=${collectionId}`;

  const content = isHovered ? (
    <>
      <Flex flexDir="column" gap={2} px={3}>
        <Link
          href={`${explorerUrl}/token/${address}?${utmParams}`}
          isExternal
          fontWeight="500"
        >
          {name}
        </Link>
        <Text fontSize="sm">
          Token ID:{" "}
          <Link
            href={`${explorerUrl}/token/${address}/instance/${id}?${utmParams}`}
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
        overflowY="scroll"
        css={{
          scrollbarWidth: "auto",
          scrollbarColor: "initial",
          scrollbarGutter: "stable",
          paddingInlineEnd: "8px",
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: "8px",
            border: "0px solid transparent",
          },
        }}
      >
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
        bg={colors[rarity].bg}
        position="relative"
      >
        {isAnimated ? (
          <Box as="video" autoPlay loop muted playsInline width="130px">
            <source
              src={`${config.images.baseUrl}/${collectionId}/${rarity}.webm`}
              type="video/webm"
            />
            Your browser does not support the video tag.
          </Box>
        ) : (
          <Image
            src={`${config.images.baseUrl}/${collectionId}/${rarity}.png`}
            alt={`${name} badge`}
            width="130px"
          />
        )}
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
      <></> {/* Fixes scrollbar issue */}
      <Text fontWeight="500" px={3} noOfLines={1}>
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
