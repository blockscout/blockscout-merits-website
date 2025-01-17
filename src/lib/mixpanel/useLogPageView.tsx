import { useSearchParams } from "next/navigation";
import React from "react";

import getQueryParamString from "~/lib/router/getQueryParamString";

import getTabName from "./getTabName";
import logEvent from "./logEvent";
import { EventTypes } from "./utils";

export default function useLogPageView(isInited: boolean) {
  const searchParams = useSearchParams();
  const tab = getQueryParamString(searchParams.get("tab"));
  const id = searchParams.get("id") || undefined;

  React.useEffect(() => {
    if (!isInited) return;

    logEvent(EventTypes.PAGE_VIEW, {
      Source: getTabName(tab),
      Extra: id,
    });
  }, [isInited, tab, id]);
}
