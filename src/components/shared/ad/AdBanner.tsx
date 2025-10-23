import { chakra } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { SliseAd } from "@slise/embed-react";

import Skeleton from "~/chakra/Skeleton";
import useAdblockDetect from "~/hooks/useAdblockDetect";
import config from "~/config/app";

interface Props {
  className?: string;
}

const AdBanner = ({ className }: Props) => {
  const isAdblockDetected = useAdblockDetect();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!config.adBanner || isAdblockDetected) return;

    const container = containerRef.current;
    if (!container) return;

    const existingIframe = container.querySelector("iframe");
    if (existingIframe) {
      setIsLoaded(true);
      return;
    }

    const observer = new MutationObserver(() => {
      const iframe = container.querySelector("iframe");
      if (iframe) {
        setIsLoaded(true);
        observer.disconnect();
      }
    });

    observer.observe(container, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, [isAdblockDetected]);

  if (!config.adBanner || isAdblockDetected) {
    return null;
  }

  return (
    <Skeleton
      ref={containerRef}
      isLoaded={isLoaded}
      className={className}
      h="100px"
      w="320px"
      display={{ base: "none", lg: "flex" }}
      borderRadius="md"
      overflow="hidden"
      flexShrink={0}
    >
      <SliseAd
        slotId="blockscout-merits-website"
        pub="pub-10"
        format="320x100"
        style={{ width: "320px", height: "100px" }}
      />
    </Skeleton>
  );
};

export default chakra(AdBanner);
