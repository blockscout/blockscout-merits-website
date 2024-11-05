import { Flex, Link, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <Flex
      h={"100vh"}
      w={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      rowGap={"15px"}
      p={{ base: "26px 28px", md: "36px 48px" }}
    >
      <Text fontSize={"subtitle"} fontWeight={"semibold"} textAlign={"center"}>
        The Merits hub will be available soon soon
      </Text>
      <Text fontSize={"body"} textAlign={"center"}>
        Stay tuned on our socials!{" "}
        <Link href="https://x.com/blockscoutcom">
          Follow Blockscout X account
        </Link>
      </Text>
    </Flex>
  );
}
