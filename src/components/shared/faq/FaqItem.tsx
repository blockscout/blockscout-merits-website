import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  chakra,
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
            <SpriteIcon
              name={isExpanded ? "minus" : "plus"}
              boxSize={6}
              color="blue.600"
              _groupHover={{ color: "blue.400" }}
              transition="colors"
            />
            <chakra.h3>{index + 1}.</chakra.h3>
            <chakra.h3 flex="1" textAlign="left">
              {question}
            </chakra.h3>
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
