import { Box, Heading, Accordion, Flex } from "@chakra-ui/react";
import React from "react";

import FaqItem from "./FaqItem";

type Props = {
  items: {
    question: string;
    answer: string | React.ReactNode;
  }[];
};

const Faq = ({ items }: Props) => {
  const sliceIndex = Math.ceil(items.length / 2);
  return (
    <Box mt={{ base: 6, md: 10 }}>
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
          {items.slice(0, sliceIndex).map((item, index) => (
            <FaqItem
              key={index}
              index={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </Accordion>
        <Accordion flex={1} allowMultiple>
          {items.slice(sliceIndex).map((item, index) => (
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
