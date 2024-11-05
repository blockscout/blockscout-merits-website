import { Flex, Heading, Text } from "@chakra-ui/react";
import { termsContent } from "./content";

const TermsOfServicePage = () => {
  return (
    <Flex
      flexDirection={"column"}
      alignItems={"flex-start"}
      rowGap={"40px"}
      p={{ base: "26px 28px", md: "36px 48px" }}
    >
      <Heading fontSize="title">Terms of use</Heading>

      {termsContent.map((value, key) => {
        return (
          <Flex key={key} flexDirection={"column"} rowGap={"15px"}>
            <Heading fontSize={"subtitle"} fontWeight={"semibold"}>
              {value.title}
            </Heading>
            <Text fontSize={"body"}>{value.body}</Text>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default TermsOfServicePage;
