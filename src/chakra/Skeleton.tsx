import type { SkeletonProps } from "@chakra-ui/react";
import { Skeleton as SkeletonBase } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import React from "react";

const shine = () =>
  keyframes({
    to: { backgroundPositionX: "-200%" },
  });

const Skeleton = (
  props: SkeletonProps & { ref?: React.LegacyRef<HTMLDivElement> },
) => {
  return (
    <SkeletonBase
      speed={1}
      animation={`1s linear infinite ${shine()}`}
      {...props}
    />
  );
};

export default React.memo(Skeleton);
