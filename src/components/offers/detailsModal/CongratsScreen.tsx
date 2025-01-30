import { Flex, Image, Text, Button, Link } from "@chakra-ui/react";
import React from "react";

import type { Offer } from "~/types/api/offer";

import { apos } from "~/lib/htmlEntities";
import CopyToClipboard from "~/components/shared/CopyToClipboard";

import { getBgColor } from "../utils";

type Props = {
  offer: Offer;
  promoCode: string | undefined;
  onClose: () => void;
  onOpenInstructions: () => void;
};

const CongratsScreen = ({
  offer,
  promoCode,
  onClose,
  onOpenInstructions,
}: Props) => {
  const bgColor = getBgColor(offer.details.type, true);
  return (
    <Flex flexDir="column" alignItems="center" gap={6}>
      <Flex
        boxSize="184px"
        alignItems="center"
        justifyContent="center"
        borderRadius="lg"
        bg={bgColor}
      >
        <Image
          src={offer.details.image_url}
          alt={`${offer.details.title} image`}
          transform="scale(0.75)"
        />
      </Flex>
      <Flex flexDir="column" alignItems="center" gap={2}>
        <Text>
          {promoCode
            ? "Promo code"
            : `You${apos}ve been added to the whitelist`}
        </Text>
        {promoCode && (
          <Flex position="relative">
            <Text fontWeight="600">{promoCode}</Text>
            <CopyToClipboard
              text={promoCode}
              position="absolute"
              right="-30px"
              top="1px"
            />
          </Flex>
        )}
      </Flex>
      <Flex w="full" flexDir="column" alignItems="center" gap={3}>
        <Button w="full" onClick={onClose}>
          Check other rewards
        </Button>
        <Link fontWeight="600" onClick={onOpenInstructions}>
          How to use
        </Link>
      </Flex>
    </Flex>
  );
};

export default CongratsScreen;
