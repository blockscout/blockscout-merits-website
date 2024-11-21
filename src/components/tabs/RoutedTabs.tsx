import type { ChakraProps, ThemingProps } from "@chakra-ui/react";
import { chakra } from "@chakra-ui/react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";

import type { RoutedTab } from "./types";

import TabsWithScroll from "./TabsWithScroll";
import useTabIndexFromQuery from "./useTabIndexFromQuery";

interface Props extends ThemingProps<"Tabs"> {
  tabs: Array<RoutedTab>;
  tabListProps?:
    | ChakraProps
    | (({
        isSticky,
        activeTabIndex,
      }: {
        isSticky: boolean;
        activeTabIndex: number;
      }) => ChakraProps);
  rightSlot?: React.ReactNode;
  rightSlotProps?: ChakraProps;
  leftSlot?: React.ReactNode;
  leftSlotProps?: ChakraProps;
  stickyEnabled?: boolean;
  className?: string;
  onTabChange?: (index: number) => void;
  isLoading?: boolean;
}

const RoutedTabs = ({
  tabs,
  tabListProps,
  rightSlot,
  rightSlotProps,
  leftSlot,
  leftSlotProps,
  stickyEnabled,
  className,
  onTabChange,
  isLoading,
  ...themeProps
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tabIndex = useTabIndexFromQuery(tabs);
  const tabsRef = useRef<HTMLDivElement>(null);

  const handleTabChange = React.useCallback(
    (index: number) => {
      const nextTab = tabs[index];

      const params = new URLSearchParams(searchParams.toString());
      const tabId = Array.isArray(nextTab.id) ? nextTab.id[0] : nextTab.id;
      params.set("tab", tabId);

      router.push(`${pathname}?${params}`);

      onTabChange?.(index);
    },
    [tabs, router, pathname, searchParams, onTabChange],
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get("scroll_to_tabs")) {
      tabsRef?.current?.scrollIntoView(true);
      params.delete("scroll_to_tabs");
      router.push(`${pathname}?${params}`);
    }
    // replicate componentDidMount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TabsWithScroll
      tabs={tabs}
      tabListProps={tabListProps}
      leftSlot={leftSlot}
      leftSlotProps={leftSlotProps}
      rightSlot={rightSlot}
      rightSlotProps={rightSlotProps}
      stickyEnabled={stickyEnabled}
      onTabChange={handleTabChange}
      defaultTabIndex={tabIndex}
      isLoading={isLoading}
      {...themeProps}
    />
  );
};

export default React.memo(chakra(RoutedTabs));
