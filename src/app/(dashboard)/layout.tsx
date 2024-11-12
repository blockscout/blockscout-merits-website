"use client";

import React, { useCallback } from "react";
import { Flex, Box, Button, Text } from "@chakra-ui/react";
import { useAppKit } from "@reown/appkit/react";

import SpriteIcon from "~/components/SpriteIcon";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { open } = useAppKit();

  const handleClick = useCallback(() => {
    open();
  }, [open]);

  return (
    <Flex direction="column" minH="100vh">
      <Flex
        as="header"
        justify="center"
        align="center"
        w="full"
        h="64px"
        px={12}
        mx="auto"
        borderBottom="1px solid"
        borderColor="divider"
      >
        <Flex justify="space-between" align="center" w="full" maxW="1280px">
          <SpriteIcon name="merits-logo" w="87px" h="24px" />
          <Button
            variant="outline"
            colorScheme="gray"
            size="sm"
            onClick={handleClick}
          >
            Log in
          </Button>
        </Flex>
      </Flex>
      <Box as="main" flex="1">
        {children}
      </Box>
      <Flex
        as="footer"
        justify="center"
        align="center"
        w="full"
        h="48px"
        px={12}
        mx="auto"
        mb={4}
      >
        <Flex justify="space-between" align="center" w="full">
          <Flex alignItems="center" gap={1.5}>
            <Text fontSize="xs">Made with</Text>
            <SpriteIcon name="blockscout-logo" w="80px" h="12px" />
            <Text fontSize="xs">
              Tool for inspecting and analyzing EVM based blockchains.
            </Text>
          </Flex>
          <Flex alignItems="center" gap={3}>
            <Text fontSize="xs">Copyright @ Blockscout Limited 2023-2024</Text>
            <Flex gap={2}>
              <SpriteIcon name="telegram" boxSize={5} />
              <SpriteIcon name="github" boxSize={5} />
              <SpriteIcon name="x" boxSize={5} />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
