import { Flex, Button, Grid, Alert, Text, Link } from "@chakra-ui/react";

import Skeleton from "~/chakra/Skeleton";
import { apos } from "~/lib/htmlEntities";
import { useAppContext } from "~/contexts/app";
import useBadgesQuery from "~/hooks/useBadgesQuery";

import BadgeCard from "~/components/dashboard/BadgeCard";
import EmptyState from "~/components/shared/EmptyState";
import SpriteIcon from "~/components/shared/SpriteIcon";

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
        image={{
          src: "/static/badges.svg",
          width: 269,
          height: 129,
        }}
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
              href="https://badges.blockscout.com?utm_source=merits-hub&utm_medium=badges-empty-tab"
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
    <>
      {!badgesQuery.isPlaceholderData && (
        <Alert
          status="info"
          w="full"
          display="flex"
          justifyContent="center"
          gap={{ base: 2, md: 3 }}
          py={2}
          px={3}
          mb={8}
        >
          <SpriteIcon name="info-circle" boxSize={5} flexShrink={0} />
          <Text fontWeight="semibold" textAlign="center">
            Joined recent campaigns? Mint your Merit Badge{" "}
            <Link
              href="https://badges.blockscout.com/home?utm_source=merits-hub&utm_medium=badges"
              isExternal
              textDecoration="underline"
            >
              here
            </Link>
          </Text>
        </Alert>
      )}
      <Grid gap={6} templateColumns="repeat(auto-fill, minmax(230px, 1fr))">
        {badgesQuery.data?.map((badge, index) => (
          <Skeleton key={index} isLoaded={!badgesQuery.isPlaceholderData}>
            <BadgeCard {...badge} />
          </Skeleton>
        ))}
      </Grid>
    </>
  );
}
