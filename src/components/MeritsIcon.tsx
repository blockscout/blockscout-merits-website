import { Icon, useColorModeValue, chakra } from "@chakra-ui/react";
import React from "react";

import meritsIcon from "@/public/static/merits.svg";

type Props = {
  className?: string;
  noShadow?: boolean;
};

const MeritsIcon = ({ className, noShadow }: Props) => {
  const shadow = useColorModeValue(
    "drop-shadow(0px 4px 2px rgba(141, 179, 204, 0.25))",
    "none",
  );

  return (
    <Icon
      as={meritsIcon}
      className={className}
      filter={noShadow ? undefined : shadow}
    />
  );
};

export default chakra(MeritsIcon);
