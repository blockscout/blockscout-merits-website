import {
  Flex,
  Button,
  Grid,
  Alert,
  AlertIcon,
  AlertTitle,
  Link,
} from "@chakra-ui/react";

import Skeleton from "~/chakra/Skeleton";
import { apos } from "~/lib/htmlEntities";
import { useAppContext } from "~/contexts/app";
import useBadgesQuery from "~/hooks/useBadgesQuery";

import BadgeCard from "~/components/dashboard/BadgeCard";
import EmptyState from "~/components/shared/EmptyState";
import Faq from "~/components/shared/faq/Faq";

const FAQ_ITEMS = [
  {
    question: "What are badges?",
    answer: (
      <>
        Blockscout Badges is a new initiative by the Blockscout Team, designed
        to celebrate and recognize our community members for their involvement
        in key campaigns and contributions.
      </>
    ),
  },
  {
    question:
      "Are there different traits in each collection? What makes them unique?",
    answer: (
      <>
        Each Blockscout Badge collection features four distinct rarity levels,
        giving users an exciting opportunity to mint a legendary NFT. The rarity
        tiers include Common, Rare, Super Rare, and Legendary, with each mint
        offering a randomized chance at unlocking the most coveted level.
        Sometimes, you can also find <b>Epic badges</b> hidden within the
        Blockscout ecosystem.
      </>
    ),
  },
  {
    question: "Why am ineligible?",
    answer: (
      <>
        Participants for each NFT were gathered during the designated campaign
        period. But don{apos}t worry — Blockscout will be launching more NFTs in
        future campaigns! Be sure to follow our social channels to stay updated
        on the next exciting opportunity.
      </>
    ),
  },
  {
    question: "Are collection items limited in quantity?",
    answer:
      "Each collection is a limited edition, with a maximum of one NFT per participant per campaign.",
  },
  {
    question: "Can I transfer or sell my badges?",
    answer:
      "All Blockscout Badges are transferable, allowing you to move them to new wallets or sell them on secondary markets.",
  },
];

export default function BadgesTab() {
  const { isInitialized, apiToken, loginModal } = useAppContext();
  const isLoginButtonShown = isInitialized && !apiToken;

  const badgesQuery = useBadgesQuery();

  let content = null;

  if (
    !apiToken ||
    (!badgesQuery.isPlaceholderData && badgesQuery.data?.length === 0)
  ) {
    content = (
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
  } else {
    content = (
      <>
        {!badgesQuery.isPlaceholderData && (
          <Alert status="info" colorScheme="gray" mb={8}>
            <AlertIcon display={{ base: "none", lg: "flex" }} />
            <AlertTitle>
              Joined recent campaigns? Mint your Merit Badge{" "}
              <Link
                href="https://badges.blockscout.com/home?utm_source=merits-hub&utm_medium=badges"
                isExternal
                // textDecoration="underline"
              >
                here
              </Link>
            </AlertTitle>
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

  return (
    <>
      {content}
      <Faq items={FAQ_ITEMS} />
    </>
  );
}
