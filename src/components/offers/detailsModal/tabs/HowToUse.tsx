import React from "react";
import { Flex, Text, Box } from "@chakra-ui/react";

import type { Offer } from "~/types/api/offer";

import Markdown from "~/components/shared/Markdown";

type Props = {
  offer: Offer;
  alert: React.ReactNode | null;
  redeemButton: React.ReactNode | null;
};

export default function HowToUse({ offer, alert, redeemButton }: Props) {
  return (
    <Flex flexDir="column" mt={-2}>
      {alert}
      <Box maxH={{ base: "auto", md: "338px" }} overflowY="scroll" mb={6}>
        <Flex
          flexDir="column"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="lg"
        >
          {offer.details.steps.map((step, index) => (
            <Flex
              key={index}
              flexDir="column"
              gap={2}
              p={5}
              borderBottom="1px solid"
              borderColor="gray.200"
              _last={{ borderBottom: "none" }}
            >
              <Text fontWeight="500">
                {index + 1}. {step.title}
              </Text>
              <Markdown fontSize="sm">{step.description}</Markdown>
            </Flex>
          ))}
        </Flex>
      </Box>
      {redeemButton}
    </Flex>
  );
}
