import {
  Box,
  Heading,
  Accordion,
  Link,
  Flex,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import React from "react";

import FaqItem from "./FaqItem";

const FAQ_ITEMS = [
  {
    question: "What is Blockscout?",
    answer:
      "Blockscout is an open-source block explorer serving over 1000 EVM-based chains. We provide comprehensive blockchain data analysis, dApp discovery, and developer tools, making blockchain data accessible and transparent for everyone.",
  },
  {
    question: "What are Merits?",
    answer:
      "Merits are digital rewards you earn by using Blockscout block explorers and participating in our ecosystem. They make blockchain exploration more engaging and fun while recognizing active community members.",
  },
  {
    question: "How do I earn Merits?",
    answer: (
      <UnorderedList>
        <ListItem>Sign up (100 Merits, or 200 with referral)</ListItem>
        <ListItem>Daily login claims (10 Merits)</ListItem>
        <ListItem>Using Swapscout</ListItem>
        <ListItem>Participating in campaigns</ListItem>
        <ListItem>Referring friends</ListItem>
        <ListItem>Various explorer activities (more info soon)</ListItem>
      </UnorderedList>
    ),
  },
  {
    question: "How does the daily claim work?",
    answer:
      "The daily claim is worth 10 Merits. You can claim one time per day, and the amount resets to 10 Merits at 0:00 UTC each day. To claim, login to the Dashboard and click the claim button.",
  },
  {
    question: "How do I earn Merits using Swapscout?",
    answer: (
      <>
        Swapscout users who are signed up to the Merits program receive Merits
        based on their own usage, total usage (how many users use{" "}
        <Link href="https://swap.blockscout.com" isExternal>
          Swapscout
        </Link>
        ) and fees. These Merits are automatically distributed to the account
        each day at 0:00 UTC.
        <br />
        Read more here:{" "}
        <Link
          href="https://www.blog.blockscout.com/swapscout-merits-block-explorer/"
          isExternal
        >
          https://www.blog.blockscout.com/swapscout-merits-block-explorer/
        </Link>
      </>
    ),
  },
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
    question: "Are Merits tied to any blockchain?",
    answer:
      "No, Merits exist across chains and are tied to your Blockscout account (0x address). You can earn them on any supported chain, and they accumUnorderedListate in one place.",
  },
  {
    question: "What can I do with Merits?",
    answer: (
      <>
        While Merits have no material value, they may unlock future benefits
        like:
        <UnorderedList>
          <ListItem>Access to exclusive features</ListItem>
          <ListItem>
            Special program access or discounts via partnerships
          </ListItem>
          <ListItem>Community perks</ListItem>
        </UnorderedList>
      </>
    ),
  },
  {
    question: "Where can I learn more about Merits",
    answer: (
      <>
        The blog announcement includes information about the origins of the
        program, how you can earn Merits, and future directions. Read more here:{" "}
        <Link
          href="https://www.blog.blockscout.com/blockscout-merits-rewarding-block-explorer-skills/"
          isExternal
        >
          https://www.blog.blockscout.com/blockscout-merits-rewarding-block-explorer-skills/
        </Link>
      </>
    ),
  },
];

const Faq = () => {
  const sliceIndex = Math.ceil(FAQ_ITEMS.length / 2);
  return (
    <Box mt={{ base: 0, md: 10 }}>
      <Heading
        as="h2"
        lineHeight="32px"
        mb={3}
        fontSize="2xl"
        fontWeight="medium"
      >
        FAQ
      </Heading>
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        gap={{ base: 0, md: 12 }}
      >
        <Accordion flex={1} allowMultiple>
          {FAQ_ITEMS.slice(0, sliceIndex).map((item, index) => (
            <FaqItem
              key={index}
              index={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </Accordion>
        <Accordion flex={1} allowMultiple>
          {FAQ_ITEMS.slice(sliceIndex).map((item, index) => (
            <FaqItem
              key={index}
              index={index + sliceIndex}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </Accordion>
      </Flex>
    </Box>
  );
};

export default Faq;
