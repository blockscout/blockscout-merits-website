import { Skeleton, Text, Flex, Button, Image } from "@chakra-ui/react";

import { useAppContext } from "~/contexts/app";

export default function DashboardBanner() {
  const { isInitialized, loginModal } = useAppContext();

  return (
    <Skeleton
      isLoaded={isInitialized}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      w="full"
      px={8}
      py={6}
      borderRadius="md"
      bgGradient="linear(255deg, #9CD8FF 9.09%, #D0EFFF 88.45%)"
      position="relative"
      overflow="hidden"
    >
      <Text
        fontSize="28px"
        lineHeight="36px"
        color="blue.700"
        fontWeight="semibold"
        zIndex={1}
      >
        Master the block explorer.
        <br />
        Earn Merits.
      </Text>
      <Flex gap={4} zIndex={1}>
        <Button
          variant="outline"
          as="a"
          href="https://docs.blockscout.com/using-blockscout/merits"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn More
        </Button>
        <Button onClick={loginModal.onOpen}>Log in</Button>
      </Flex>
      <Image
        src="/bg-merit-1.svg"
        alt="Merit 1"
        w="308px"
        position="absolute"
        bottom={0}
        right="calc(50% - 50px)"
      />
      <Image
        src="/bg-merit-2.svg"
        alt="Merit 2"
        w="150px"
        position="absolute"
        top={0}
        right="30%"
      />
      <Image
        src="/bg-merit-3.svg"
        alt="Merit 3"
        w="90px"
        position="absolute"
        top={0}
        right="15%"
      />
    </Skeleton>
  );
}
