import { Flex, Text, chakra } from "@chakra-ui/react";
import React from "react";

import type { IconName } from "~/components/shared/SpriteIcon";
import SpriteIcon from "~/components/shared/SpriteIcon";

type Props = {
  icon: IconName;
  text: string;
  className?: string;
};

const LabelWithIcon = ({ icon, text, className }: Props) => {
  return (
    <Flex
      className={className}
      px={2}
      h="28px"
      gap={2}
      alignItems="center"
      borderRadius="base"
      bgColor="white"
    >
      <SpriteIcon name={icon} boxSize={5} color="blackAlpha.800" />
      <Text fontSize="sm">{text}</Text>
    </Flex>
  );
};

export default chakra(LabelWithIcon);
