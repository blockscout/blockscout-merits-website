import { Flex, Image, Text, Button, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

import type { Offer } from "~/types/api/offer";

import { apos } from "~/lib/htmlEntities";
import CopyToClipboard from "~/components/shared/CopyToClipboard";
import Skeleton from "~/chakra/Skeleton";
import useConfigQuery from "~/hooks/useConfigQuery";

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
  const configQuery = useConfigQuery();
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
        <Skeleton isLoaded={Boolean(promoCode) || !configQuery.isLoading}>
          <Text textAlign="center">
            {promoCode ? (
              "Promo code"
            ) : offer.offer_id ===
              configQuery.data?.rewards?.blockscout_activity_pass_id ? (
              <>
                You have successfully claimed your Activity Pass.{" "}
                <NextLink href="/?tab=activity" passHref legacyBehavior>
                  <Link>Check the Activity Tab</Link>
                </NextLink>{" "}
                to get started.
              </>
            ) : (
              `You${apos}ve been added to the whitelist`
            )}
          </Text>
        </Skeleton>
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
