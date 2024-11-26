import { Flex, Image, Text, Button } from "@chakra-ui/react";

import { apos } from "~/lib/htmlEntities";
import { useAppContext } from "~/contexts/app";

export default function BadgesTab() {
  const { isInitialized, apiToken, loginModal } = useAppContext();
  const isLoginButtonShown = isInitialized && !apiToken;

  return (
    <Flex
      w="full"
      justifyContent="center"
      py={12}
      px={2}
      border="1px solid"
      borderColor="divider"
      borderRadius="lg"
    >
      <Flex maxW="400px" flexDir="column" alignItems="center">
        <Image src="/static/badges.svg" alt="Badges" w="270px" mb={6} />
        <Text fontSize="lg" fontWeight="medium" mb={2}>
          Badges
        </Text>
        <Text textAlign="center" mb={6}>
          Collect limited edition NFT Badges by completing Blockscout related
          tasks. See what{apos}s available on the Badges page and start your
          collection!
        </Text>
        <Flex gap={4}>
          {isLoginButtonShown && (
            <Button onClick={loginModal.onOpen}>Log in</Button>
          )}
          <Button
            variant={isLoginButtonShown ? "outline" : "solid"}
            as="a"
            target="_blank"
            rel="noopener"
            href="https://badges.blockscout.com/"
          >
            Mint your badges
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
