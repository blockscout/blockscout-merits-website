import { Flex, Text, Button, Link, Box } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useCallback } from "react";

import type { Offer } from "~/types/api/offer";

type Props = {
  offer: Offer;
  redeem: (offer: Offer) => void;
  isRedeeming: boolean;
};

export default function HowToUse({ offer, redeem, isRedeeming }: Props) {
  const handleRedeem = useCallback(() => {
    redeem(offer);
  }, [offer, redeem]);

  return (
    <Flex flexDir="column" gap={6}>
      <Box maxH="338px" overflowY="scroll">
        <Flex
          flexDir="column"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="lg"
        >
          {offer.details.steps.map((step, index) => (
            <Flex
              key={index}
              flexDir="column"
              gap={2}
              p={5}
              borderBottom="1px solid"
              borderColor="gray.200"
              _last={{ borderBottom: "none" }}
            >
              <Text fontWeight="500">
                {index + 1}. {step.title}
              </Text>
              <Text fontSize="sm">
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    a: ({ node, ...props }) => <Link {...props} isExternal />,
                  }}
                >
                  {step.description}
                </ReactMarkdown>
              </Text>
            </Flex>
          ))}
        </Flex>
      </Box>
      <Button onClick={handleRedeem} isLoading={isRedeeming}>
        Claim reward
      </Button>
    </Flex>
  );
}
