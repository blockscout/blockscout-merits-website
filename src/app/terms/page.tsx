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
      <Heading fontSize="32px" fontWeight="bold">Terms of use</Heading>

      {termsContent.map((value, key) => {
        return (
          <Flex key={key} flexDirection={"column"} rowGap={"15px"}>
            <Heading fontSize="2xl" fontWeight="medium">
              {value.title}
            </Heading>
            <Text>{value.body}</Text>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default TermsOfServicePage;
