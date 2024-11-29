import { Flex, Button, Grid, Skeleton } from "@chakra-ui/react";

import { apos } from "~/lib/htmlEntities";
import { useAppContext } from "~/contexts/app";
import useBadgesQuery from "~/hooks/useBadgesQuery";

import BadgeCard from "~/components/dashboard/BadgeCard";
import EmptyState from "./EmptyState";

export default function BadgesTab() {
  const { isInitialized, apiToken, loginModal } = useAppContext();
  const isLoginButtonShown = isInitialized && !apiToken;

  const badgesQuery = useBadgesQuery();

  if (
    !apiToken ||
    (!badgesQuery.isPlaceholderData && badgesQuery.data?.length === 0)
  ) {
    return (
      <EmptyState
        imageSrc="/static/badges.svg"
        imageWidth="270px"
        title="Badges"
        description={`Collect limited edition NFT Badges by completing Blockscout related
            tasks. See what${apos}s available on the Badges page and start your
            collection!`}
        contentAfter={
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
        }
        maxW="400px"
      />
    );
  }

  return (
    <Grid gap={6} templateColumns="repeat(auto-fill, minmax(230px, 1fr))">
      {badgesQuery.data?.map((badge, index) => (
        <Skeleton key={index} isLoaded={!badgesQuery.isPlaceholderData}>
          <BadgeCard {...badge} />
        </Skeleton>
      ))}
    </Grid>
  );
}
