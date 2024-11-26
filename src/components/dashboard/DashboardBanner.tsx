import { Flex, Text, Button, Image } from "@chakra-ui/react";

export default function DashboardBanner() {
  return (
    <Flex
      flexDir={{ base: "column", md: "row" }}
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
        variant="outline"
        as="a"
        href="https://docs.blockscout.com/using-blockscout/merits"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn More
      </Button>
      <Image
        src="/static/bg_parts/merit_1.svg"
        alt="Merit 1"
        w="308px"
        position="absolute"
        bottom={0}
        right="calc(50% - 50px)"
        display={{ base: "none", md: "block" }}
      />
      <Image
        src="/static/bg_parts/merit_2.svg"
        alt="Merit 2"
        w="150px"
        position="absolute"
        top={0}
        right="30%"
        display={{ base: "none", md: "block" }}
      />
      <Image
        src="/static/bg_parts/merit_3.svg"
        alt="Merit 3"
        w="90px"
        position="absolute"
        top={0}
        right="15%"
        display={{ base: "none", md: "block" }}
      />
    </Flex>
  );
}
