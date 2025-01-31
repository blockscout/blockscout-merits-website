import { Flex, Text, Button, Image } from "@chakra-ui/react";
import React, { useCallback } from "react";

import * as mixpanel from "~/lib/mixpanel";

export default function Banner() {
  const handleClick = useCallback(() => {
    mixpanel.logEvent(mixpanel.EventTypes.ACTION, { Source: "Banner" });
  }, []);

  return (
    <Flex
      flexDir={{ base: "column", md: "row" }}
      justifyContent="space-between"
      alignItems="center"
      w="full"
      px={8}
      py={6}
      borderRadius="md"
      bgGradient="linear(284deg, #DFE4FC 19.64%, #FEFEFF 69.9%, #D3E4FF 100%)"
      position="relative"
      overflow="hidden"
    >
      <Text
        fontSize={{ base: "20px", md: "28px" }}
        lineHeight={{ base: "28px", md: "36px" }}
        color="blue.700"
        fontWeight="semibold"
        zIndex={1}
        textAlign={{ base: "center", md: "left" }}
        mb={{ base: 4, md: 0 }}
      >
        Master the block explorer.
        <br />
        Earn Merits.
      </Text>
      <Button
        as="a"
        href="https://docs.blockscout.com/using-blockscout/merits"
        target="_blank"
        rel="noopener"
        zIndex={3}
        onClick={handleClick}
      >
        Learn More
      </Button>
      <Image
        src="/static/bg_parts/merit_1.svg"
        alt="Merit 1"
        w="123px"
        position="absolute"
        top={0}
        right="55%"
        display={{ base: "none", md: "block" }}
        zIndex={1}
      />
      <Image
        src="/static/bg_parts/merit_2.svg"
        alt="Merit 2"
        h="122px"
        position="absolute"
        bottom={0}
        left="50%"
        display={{ base: "none", md: "block" }}
        zIndex={2}
      />
      <Image
        src="/static/bg_parts/merit_3.svg"
        alt="Merit 3"
        w="436px"
        position="absolute"
        bottom={0}
        right={0}
        display={{ base: "none", md: "block" }}
        zIndex={1}
      />
    </Flex>
  );
}
