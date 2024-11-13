"use client";

import React, { useEffect } from "react";
import { Flex, Box, Text, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/compat/router";

import * as cookies from "~/lib/cookies";
import SpriteIcon from "~/components/SpriteIcon";
import LoginModal from "~/components/login/LoginModal";
import AccountButton from "~/components/AccountButton";
import getQueryParamString from "~/lib/router/getQueryParamString";
import removeQueryParam from "~/lib/router/removeQueryParam";
import { useAppContext } from "~/contexts/app";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const loginModal = useDisclosure();
  const { isInitialized, apiToken, address } = useAppContext();

  useEffect(() => {
    if (!router) {
      return;
    }
    const refCode = getQueryParamString(router.query.ref);
    if (refCode) {
      cookies.set(cookies.NAMES.REFERRAL_CODE, refCode);
      removeQueryParam(router, "ref");
      if (!apiToken) {
        loginModal.onOpen();
      }
    }
  }, [router, apiToken, loginModal]);

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
          <AccountButton
            isLoading={!isInitialized}
            address={address}
            openModal={loginModal.onOpen}
          />
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
              <SpriteIcon name="social/telegram-circle" boxSize={5} />
              <SpriteIcon name="social/github-circle" boxSize={5} />
              <SpriteIcon name="social/x-circle" boxSize={5} />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      {loginModal.isOpen && <LoginModal onClose={loginModal.onClose} />}
    </Flex>
  );
}
