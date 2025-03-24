import { UnorderedList, ListItem } from "@chakra-ui/react";

import Faq from "~/components/shared/faq/Faq";
import { laquo, raquo } from "~/lib/htmlEntities";

const FAQ_ITEMS = [
  {
    question: "What is Performance Rank?",
    answer: (
      <>
        <b>Performance Rank</b> is your position among users with{" "}
        <b>Activity Passes</b> who are earning <b>Merits</b>. A higher rank
        means you are among the top users who have earned the most <b>Merits</b>
        . The higher your <b>Performance Rank</b>, the more <b>Merits</b> you
        receive.
      </>
    ),
  },
  {
    question: "How is the amount of Merits calculated?",
    answer: (
      <>
        Users with different <b>Performance Ranks</b> receive different amounts
        of <b>Merits</b>:
        <br />
        <br />
        <UnorderedList>
          <ListItem>≥ 90% — 100 Merits</ListItem>
          <ListItem>≥ 75% — 80 Merits</ListItem>
          <ListItem>≥ 50% — 60 Merits</ListItem>
          <ListItem>≥ 25% — 40 Merits</ListItem>
          <ListItem>≥ 5% — 20 Merits</ListItem>
          <ListItem>{`< 5% — 5 Merits`}</ListItem>
        </UnorderedList>
        <br />
        The <b>Merits</b> distribution per <b>Performance Rank</b> may change
        over time, so stay updated!
      </>
    ),
  },
  {
    question:
      "What should I do after getting an Activity Pass? Where do I start?",
    answer: (
      <>
        Click the{" "}
        <b>
          {laquo}Earn{raquo}
        </b>{" "}
        button to see the list of <b>Blockscout Explorers</b> where you can earn{" "}
        <b>Merits</b> just by using them. You can also check our documentation
        for details on specific activities that grant <b>Merits</b>.
      </>
    ),
  },
  {
    question: "What types of activities allow me to earn Merits?",
    answer: (
      <>
        All available activities that grant <b>Merits</b> can be found in our
        documentation. This list is continuously updated and may change over
        time.
      </>
    ),
  },
  {
    question: "How do I receive my earned Merits?",
    answer: (
      <>
        Activity statistics are updated <b>weekly</b>. Every <b>Monday</b>, all
        earned <b>Merits</b> are automatically distributed. At the start of each
        new week, <b>Performance Ranks</b> and previously earned <b>Merits</b>{" "}
        are reset. <b>New week, new achievements!</b>
      </>
    ),
  },
  {
    question: "Which Blockscout Explorers can I use to earn Merits?",
    answer: (
      <>
        You can find the full list of <b>Blockscout Explorers</b> eligible for
        earning <b>Merits</b> in our documentation or by clicking the{" "}
        <b>
          {laquo}Earn{raquo}
        </b>{" "}
        button on the activity cards.
      </>
    ),
  },
];

const TasksFaq = () => <Faq items={FAQ_ITEMS} />;

export default TasksFaq;
