"use client";

import React, { useEffect } from "react";
import {
  Flex,
  Text,
  Icon,
  Link,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import meritsLogo from "@/public/static/merits_logo.svg";
import meritsLogoShort from "@/public/static/merits_logo_short.svg";
import * as cookies from "~/lib/cookies";
import SpriteIcon from "~/components/shared/SpriteIcon";
import LoginModal from "~/components/login/LoginModal";
import AccountButton from "~/components/AccountButton";
import HistoryModal from "~/components/HistoryModal";
import { useAppContext } from "~/contexts/app";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { isInitialized, apiToken, address, loginModal } = useAppContext();
  const historyModal = useDisclosure();

  useEffect(() => {
    if (!router || !isInitialized) {
      return;
    }
    const params = new URLSearchParams(searchParams.toString());
    const refCode = params.get("ref");
    if (refCode) {
      cookies.set(cookies.NAMES.REFERRAL_CODE, refCode);
      params.delete("ref");
      router.replace(`${pathname}?${params}`);
      if (!apiToken) {
        loginModal.onOpen();
      }
    }
    const showHistory = params.get("history");
    if (showHistory !== null) {
      params.delete("history");
      router.replace(`${pathname}?${params}`);
      historyModal.onOpen();
    }
  }, [
    router,
    apiToken,
    loginModal,
    searchParams,
    pathname,
    isInitialized,
    historyModal,
  ]);

  return (
    <Flex direction="column" minH="100vh">
      <Flex
        as="header"
        justify="center"
        align="center"
        w="full"
        h="64px"
        px={{ base: 3, md: 12 }}
        mx="auto"
        mb={9}
        borderBottom="1px solid"
        borderColor="divider"
      >
        <Flex justify="space-between" align="center" w="full" maxW="1280px">
          <Icon
            display={{ base: "block", md: "none" }}
            as={meritsLogoShort}
            w="87px"
            h="24px"
          />
          <Icon
            display={{ base: "none", md: "block" }}
            as={meritsLogo}
            w="188px"
            h="24px"
          />
          <Flex gap={3}>
            <AccountButton
              isLoading={!isInitialized}
              address={address}
              openModal={loginModal.onOpen}
            />
            <Button size="sm" onClick={historyModal.onOpen}>
              Your history
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        as="main"
        flex="1"
        px={{ base: 3, md: 12 }}
        flexDir="column"
        alignItems="center"
      >
        <Flex w="full" maxW="1280px">
          {children}
        </Flex>
      </Flex>
      <Flex
        as="footer"
        justify="center"
        align="center"
        w="full"
        minH="48px"
        px={{ base: 3, md: 12 }}
        mx="auto"
        mb={4}
        mt={12}
      >
        <Flex
          justify="space-between"
          align="center"
          w="full"
          maxW="1280px"
          flexWrap="wrap"
          gap={3}
        >
          <Flex alignItems="center" gap={1.5} flexWrap="wrap">
            <Text fontSize="xs">Made with</Text>
            <SpriteIcon name="blockscout-logo" w="80px" h="12px" />
            <Text fontSize="xs">
              Open-source block explorer for all EVM blockchains.
            </Text>
          </Flex>
          <Flex alignItems="center" gap={3}>
            <Text fontSize="xs">Copyright @ Blockscout Limited 2023-2024</Text>
            <Flex gap={2}>
              <Link href="https://t.me/blockscoutnews" isExternal h={5}>
                <SpriteIcon name="social/telegram-circle" boxSize={5} />
              </Link>
              <Link href="https://github.com/blockscout" isExternal h={5}>
                <SpriteIcon name="social/github-circle" boxSize={5} />
              </Link>
              <Link href="https://x.com/blockscout" isExternal h={5}>
                <SpriteIcon name="social/x-circle" boxSize={5} />
              </Link>
              <Link href="https://discord.gg/blockscout" isExternal h={5}>
                <SpriteIcon name="social/discord-circle" boxSize={5} />
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      {loginModal.isOpen && <LoginModal onClose={loginModal.onClose} />}
      {historyModal.isOpen && <HistoryModal onClose={historyModal.onClose} />}
    </Flex>
  );
}
