import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Flex,
  Heading,
} from "@chakra-ui/react";
import React from "react";

import SpriteIcon from "~/components/shared/SpriteIcon";

interface Props {
  index: number;
  question: string;
  answer: string | React.ReactNode;
}

const FaqItem = ({ index, question, answer }: Props) => {
  return (
    <AccordionItem _first={{ borderTopWidth: 0 }} borderColor="blackAlpha.100">
      {({ isExpanded }) => (
        <>
          <AccordionButton
            _hover={{ color: "blue.400" }}
            px={0}
            py={4}
            gap={3}
            fontSize="lg"
            fontWeight={500}
            role="group"
            alignItems="flex-start"
          >
            <Flex h="28px" alignItems="center">
              <SpriteIcon
                name={isExpanded ? "minus" : "plus"}
                boxSize={6}
                color="blue.600"
                _groupHover={{ color: "blue.400" }}
                transition="colors"
              />
            </Flex>
            <Heading fontSize="lg" lineHeight={1.5}>
              {index + 1}.
            </Heading>
            <Heading fontSize="lg" lineHeight={1.5} flex="1" textAlign="left">
              {question}
            </Heading>
          </AccordionButton>
          <AccordionPanel pb={6} pt={0} px={0}>
            <Box color="text_secondary" pl={9}>
              {answer}
            </Box>
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
};

export default FaqItem;
