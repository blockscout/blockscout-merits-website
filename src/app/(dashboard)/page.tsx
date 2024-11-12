import { Flex, Text } from "@chakra-ui/react";

export default function Dashboard() {
  return (
    <Flex
      w="full"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      rowGap="15px"
      p={{ base: "26px 28px", md: "36px 48px" }}
    >
      <Text fontSize="subtitle" fontWeight="semibold" textAlign="center">
        Dashboard content goes here.
      </Text>
    </Flex>
  );
}
