import { Flex, Text, Image, Link } from "@chakra-ui/react";
import React, { useCallback } from "react";

import type { Offer } from "~/types/api/offer";

import SpriteIcon from "~/components/shared/SpriteIcon";
import LabelWithIcon from "~/components/shared/LabelWithIcon";
import capitalizeFirstLetter from "~/lib/capitalizeFirstLetter";

import { getBgColor } from "./utils";

type Props = Offer & { onClick: (id: string) => void };

export default function OfferCard({
  offer_id,
  details,
  price,
  redemptions_limit,
  redemptions_count,
  onClick,
}: Props) {
  const isExpired = redemptions_count >= redemptions_limit;
  const bgColor = getBgColor(details.type, isExpired);

  const handleClick = useCallback(() => {
    onClick(offer_id);
  }, [offer_id, onClick]);

  return (
    <Flex
      flexDir="column"
      px={2}
      pt={2}
      pb={4}
      gap={4}
      border="1px solid"
      borderColor="divider"
      borderRadius="lg"
      height="100%"
      cursor="pointer"
      onClick={handleClick}
      role="group"
    >
      <Flex
        w="full"
        h="224px"
        alignItems="center"
        justifyContent="center"
        borderRadius="base"
        bg={bgColor}
        position="relative"
      >
        <Image
          src={details.image_url}
          alt={`${details.name} image`}
          opacity={isExpired ? 0.3 : 1}
          filter={isExpired ? "grayscale(1)" : "none"}
          transitionProperty="transform"
          transitionDuration="normal"
          transitionTimingFunction="ease"
          _groupHover={{ base: {}, lg: { transform: "scale(1.1)" } }}
        />
        <LabelWithIcon
          icon="cards"
          text={`${redemptions_limit - redemptions_count}/${redemptions_limit}`}
          position="absolute"
          left="12px"
          top="12px"
        />
        <LabelWithIcon
          icon="present"
          text={capitalizeFirstLetter(details.type)}
          position="absolute"
          right="12px"
          top="12px"
        />
      </Flex>
      <Flex flexDir="column" px={3} gap={2} flex={1}>
        <Text fontWeight="600" noOfLines={2}>
          {details.name}
        </Text>
        <Text fontSize="sm" noOfLines={2}>
          {details.description}
        </Text>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          marginTop="auto"
        >
          <Link fontSize="sm" fontWeight="500" onClick={handleClick}>
            Details
          </Link>
          <Flex alignItems="center" gap={2}>
            <SpriteIcon name="merits-outline" boxSize={5} />
            <Text fontSize="sm">
              {Number(price).toLocaleString("en-US")} Merits
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
