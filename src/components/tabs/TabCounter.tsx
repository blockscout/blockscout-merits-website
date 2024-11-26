import { chakra, useColorModeValue } from "@chakra-ui/react";
import React from "react";

import getDefaultTransitionProps from "~/chakra/utils/getDefaultTransitionProps";

const COUNTER_OVERLOAD = 50;

type Props = {
  count?: number | string | null;
};

const TabCounter = ({ count }: Props) => {
  const zeroCountColor = useColorModeValue("blackAlpha.400", "whiteAlpha.400");

  if (count === undefined || count === null) {
    return null;
  }

  return (
    <chakra.span
      color={
        typeof count === "string" || count > 0
          ? "text_secondary"
          : zeroCountColor
      }
      ml={1}
      {...getDefaultTransitionProps()}
    >
      {typeof count === "number" && count > COUNTER_OVERLOAD
        ? `${COUNTER_OVERLOAD}+`
        : count}
    </chakra.span>
  );
};

export default TabCounter;
