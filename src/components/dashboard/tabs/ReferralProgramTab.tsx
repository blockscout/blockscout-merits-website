import { Flex, Button, UnorderedList, ListItem, Link } from "@chakra-ui/react";

import Skeleton from "~/chakra/Skeleton";
import DashboardCard from "~/components/dashboard/DashboardCard";
import ReadOnlyInputWithCopy from "~/components/shared/ReadOnlyInputWithCopy";
import EmptyState from "~/components/shared/EmptyState";
import Faq from "~/components/shared/faq/Faq";
import { apos } from "~/lib/htmlEntities";

import { useAppContext } from "~/contexts/app";
import useConfigQuery from "~/hooks/useConfigQuery";
import useReferralsQuery from "~/hooks/useReferralsQuery";

const FAQ_ITEMS = [
  {
    question: "How do referrals work?",
    answer: (
      <>
        When someone uses your referral code:
        <UnorderedList>
          <ListItem>They get +100 bonus Merits</ListItem>
          <ListItem>You earn 10% of their future Merit earnings</ListItem>
          <ListItem>Only applies to direct referrals</ListItem>
          <ListItem>Excludes sign-up bonuses and daily claim</ListItem>
        </UnorderedList>
      </>
    ),
  },
  {
    question: "How do I receive referral rewards?",
    answer: (
      <>
        You do not receive referral rewards when someone first signs up using
        your referral code or claims their daily bonus.
        <br />
        <br />
        However, you will receive rewards (10% of the Merits they earn) for
        block explorer usage or activities/campaigns they complete. These
        rewards will accumulate to your account, and you can claim to your
        account with the claim button in the dashboard.
        <br />
        <br />
        Activities which earn referral rewards are still in development, and
        will be listed once they become available.
        <br />
        <br />
        Learn more in the{" "}
        <Link
          href="https://blog.blockscout.com/blockscout-merits-rewarding-block-explorer-skills"
          isExternal
        >
          Merits announcement blog post
        </Link>
        .
      </>
    ),
  },
  {
    question: "How do I refer someone to the program?",
    answer: (
      <>
        In your Merits dashboard you will find a referral code and a referral
        link you can share with your friends. They can follow the link directly
        or enter the code when signing up to the program for the first time.
      </>
    ),
  },
  {
    question: "I have more questions. Where can I ask them?",
    answer: (
      <>
        If you can{apos}t find answers to your questions, you can check our
        detailed FAQ or ask directly on our Discord server.
      </>
    ),
  },
];

export default function ReferralProgramTab() {
  const { apiToken, loginModal } = useAppContext();
  const configQuery = useConfigQuery();
  const referralsQuery = useReferralsQuery();

  const referralShare = (
    <Skeleton as="span" isLoaded={!configQuery.isPending}>
      {configQuery.data?.rewards.referral_share
        ? `${Number(configQuery.data?.rewards.referral_share) * 100}%`
        : "N/A"}
    </Skeleton>
  );

  let content = null;

  if (!apiToken) {
    content = (
      <EmptyState
        image={{
          src: "/static/empty_wallet.svg",
          width: 266,
          height: 210,
        }}
        title="Refer friends and boost your Merits!"
        description={
          <>
            Receive a {referralShare} bonus on all Merits earned by your
            referrals. Login to start
          </>
        }
        contentAfter={<Button onClick={loginModal.onOpen}>Log in</Button>}
        maxW="320px"
      />
    );
  } else {
    content = (
      <DashboardCard
        title="Referral program"
        description={
          <>
            Refer friends and boost your Merits! You receive a {referralShare}{" "}
            bonus on all Merits earned by your referrals.
          </>
        }
        direction="row"
      >
        <Flex
          flex={1}
          gap={{ base: 2, md: 6 }}
          px={{ base: 4, md: 6 }}
          py={{ base: 4, md: 0 }}
          flexDirection={{ base: "column", md: "row" }}
        >
          <ReadOnlyInputWithCopy
            label="Referral link"
            value={referralsQuery.data?.link || "N/A"}
            isLoading={referralsQuery.isPending}
            flex={2}
          />
          <ReadOnlyInputWithCopy
            label="Referral code"
            value={referralsQuery.data?.code || "N/A"}
            isLoading={referralsQuery.isPending}
            flex={1}
          />
        </Flex>
      </DashboardCard>
    );
  }

  return (
    <>
      {content}
      <Faq items={FAQ_ITEMS} />
    </>
  );
}
