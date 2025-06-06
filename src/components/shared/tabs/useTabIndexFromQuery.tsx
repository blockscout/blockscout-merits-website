import { useSearchParams } from "next/navigation";

import type { RoutedTab } from "./types";

import getQueryParamString from "~/lib/router/getQueryParamString";

export default function useTabIndexFromQuery(tabs: Array<RoutedTab>) {
  const searchParams = useSearchParams();
  const tabFromQuery = getQueryParamString(searchParams.get("tab"));

  if (!tabFromQuery) {
    return 0;
  }

  const tabIndex = tabs.findIndex(({ id, subTabs }) => {
    if (Array.isArray(id)) {
      return id.includes(tabFromQuery);
    }

    return id === tabFromQuery || subTabs?.some((id) => id === tabFromQuery);
  });

  if (tabIndex < 0) {
    return 0;
  }

  return tabIndex;
}
