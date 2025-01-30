import { Flex, Image, Text } from "@chakra-ui/react";
import { upperFirst } from "lodash";
import { format } from "date-fns";
import React from "react";

import type { Offer } from "~/types/api/offer";

import SpriteIcon from "~/components/shared/SpriteIcon";
import useBalancesQuery from "~/hooks/useBalancesQuery";

import { getBgColor } from "../../utils";

type Props = {
  offer: Offer;
  alert: React.ReactNode | null;
  redeemButton: React.ReactNode | null;
};

export default function Description({ offer, alert, redeemButton }: Props) {
  const balancesQuery = useBalancesQuery();
  const bgColor = getBgColor(offer.details.type, offer.is_valid);

  return (
    <Flex flexDir="column" mt={-2}>
      {alert}
      <Flex
        gap={4}
        mb={6}
        alignItems="stretch"
        flexDir={{ base: "column", md: "row" }}
      >
        <Flex
          w={{ base: "full", md: "184px" }}
          h={{ base: "184px", md: "auto" }}
          alignItems="center"
          justifyContent="center"
          borderRadius="lg"
          bg={bgColor}
        >
          <Image
            src={offer.details.image_url}
            alt={`${offer.details.title} image`}
            opacity={!offer.is_valid ? 0.3 : 1}
            filter={!offer.is_valid ? "grayscale(1)" : "none"}
            transform="scale(0.75)"
          />
        </Flex>
        <Flex
          flex={1}
          flexDir="column"
          gap={4}
          p={5}
          border="1px solid"
          borderColor="gray.200"
          borderRadius="lg"
        >
          {[
            {
              icon: "cards" as const,
              title: "Available",
              value: `${offer.redemptions_limit - offer.redemptions_count}/${offer.redemptions_limit}`,
            },
            {
              icon: "present" as const,
              title: "Rewards",
              value: upperFirst(offer.details.type),
            },
            {
              icon: "merits-outline" as const,
              title: "Price",
              value: `${Number(offer.price).toLocaleString("en-US")} Merits`,
            },
            {
              icon: "merits-outline" as const,
              title: "Balance",
              value:
                (balancesQuery.data?.total
                  ? Number(balancesQuery.data?.total).toLocaleString("en-US")
                  : "-") + " Merits",
            },
            {
              icon: "clock" as const,
              title: "Start date",
              value: format(offer.valid_since, "dd.MM.yyyy"),
            },
            {
              icon: "clock" as const,
              title: "End date",
              value: offer.valid_until
                ? format(offer.valid_until, "dd.MM.yyyy")
                : "Unlimited",
            },
          ].map(({ icon, title, value }) => (
            <Flex
              key={title}
              alignItems="center"
              justifyContent="space-between"
              h="24px"
            >
              <Flex alignItems="center" gap={2}>
                <SpriteIcon name={icon} boxSize={5} color="gray.500" />
                <Text fontSize="sm" color="gray.500">
                  {title}
                </Text>
              </Flex>
              <Text fontSize="sm">{value}</Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
      <Text mb={6}>{offer.details.description}</Text>
      {redeemButton}
    </Flex>
  );
}
