import type { UseQueryResult } from "@tanstack/react-query";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import React, { useCallback } from "react";
import { animateScroll } from "react-scroll";

import type { PaginationParams } from "~/types/pagination";

import getQueryParamString from "~/lib/router/getQueryParamString";

type NextPageParams = Record<string, unknown>;

const INITIAL_PAGE_PARAMS = { "1": {} };

function getPaginationParamsFromQuery(
  queryString: string | Array<string> | undefined,
) {
  if (queryString) {
    try {
      return JSON.parse(
        decodeURIComponent(getQueryParamString(queryString)),
      ) as NextPageParams;
    } catch (error) {} // eslint-disable-line no-empty
  }

  return {};
}

function getNextPageParams<Response>(data: Response | undefined) {
  if (!data || typeof data !== "object" || !("next_page_params" in data)) {
    return;
  }

  return data.next_page_params;
}

export type QueryWithPagesResult<Response> = UseQueryResult<
  Response,
  unknown
> & {
  pagination: PaginationParams;
};

type Props = {
  queryKey: string;
  url: string;
  params?: Record<string, unknown>;
  placeholderData?: unknown;
  scrollRef?: React.RefObject<HTMLDivElement>;
};

export default function useQueryWithPages<Response>({
  queryKey,
  url,
  params,
  placeholderData,
  scrollRef,
}: Props): QueryWithPagesResult<Response> {
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [page, setPage] = React.useState<number>(
    searchParams.get("page") && !Array.isArray(searchParams.get("page"))
      ? Number(searchParams.get("page"))
      : 1,
  );
  const [pageParams, setPageParams] = React.useState<
    Record<number, NextPageParams>
  >({
    [page]: getPaginationParamsFromQuery(
      searchParams.get("next_page_params") || "",
    ),
  });
  const [hasPages, setHasPages] = React.useState(page > 1);

  const isMounted = React.useRef(false);

  const scrollToTop = useCallback(() => {
    if (scrollRef?.current) {
      const scrollPosition = window.scrollY;
      const elementPosition =
        scrollRef.current.getBoundingClientRect().top + scrollPosition;
      if (scrollPosition > elementPosition) {
        scrollRef.current.scrollIntoView(true);
      }
    } else {
      animateScroll.scrollToTop({ duration: 0 });
    }
  }, [scrollRef]);

  const urlObj = new URL(url);
  const queryParams = { ...pageParams[page], ...params };

  Object.entries(queryParams).forEach(([key, value]) => {
    // there are some pagination params that can be null or false for the next page
    value !== undefined &&
      value !== "" &&
      urlObj.searchParams.append(key, String(value));
  });

  const queryResult = useQuery({
    queryKey: [queryKey, urlObj.toString()],
    queryFn: async () => {
      const response = await fetch(urlObj.toString());
      return response.json();
    },
    placeholderData,
  });
  const { data } = queryResult;
  const nextPageParams = getNextPageParams(data);

  const onNextPageClick = useCallback(() => {
    if (!nextPageParams) {
      // we hide next page button if no next_page_params
      return;
    }

    setPageParams((prev) => ({
      ...prev,
      [page + 1]: nextPageParams as NextPageParams,
    }));
    setPage((prev) => prev + 1);

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page + 1));
    params.set(
      "next_page_params",
      encodeURIComponent(JSON.stringify(nextPageParams)),
    );

    setHasPages(true);
    scrollToTop();
    router.push(`${pathname}?${params}`, { scroll: false });
  }, [nextPageParams, page, router, pathname, searchParams, scrollToTop]);

  const onPrevPageClick = useCallback(() => {
    // returning to the first page
    // we dont have pagination params for the first page
    const params = new URLSearchParams(searchParams.toString());
    if (page === 2) {
      params.delete("page");
      params.delete("next_page_params");
    } else {
      params.set("page", String(page - 1));
      params.set(
        "next_page_params",
        encodeURIComponent(JSON.stringify(pageParams[page - 1])),
      );
    }
    scrollToTop();
    router.push(`${pathname}?${params}`, { scroll: false });
    if (page === 2) {
      queryClient.removeQueries({ queryKey: [queryKey] });
    }
    setPage((prev) => prev - 1);
  }, [
    router,
    page,
    pageParams,
    queryClient,
    queryKey,
    pathname,
    searchParams,
    scrollToTop,
  ]);

  const resetPage = useCallback(() => {
    scrollToTop();

    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    params.delete("next_page_params");
    router.push(`${pathname}?${params}`, { scroll: false });

    queryClient.removeQueries({ queryKey: [queryKey] });
    setPage(1);
    setPageParams(INITIAL_PAGE_PARAMS);
    window.setTimeout(() => {
      // FIXME after router is updated we still have inactive queries for previously visited page (e.g third), where we came from
      // so have to remove it but with some delay :)
      queryClient.removeQueries({
        queryKey: [queryKey],
        type: "inactive",
      });
    }, 100);
  }, [queryClient, queryKey, router, pathname, searchParams, scrollToTop]);

  const hasNextPage = nextPageParams
    ? Object.keys(nextPageParams).length > 0
    : false;

  const pagination = {
    page,
    onNextPageClick,
    onPrevPageClick,
    resetPage,
    hasPages,
    hasNextPage,
    canGoBackwards: Boolean(pageParams[page - 1]),
    isLoading: queryResult.isPlaceholderData,
    isVisible: hasPages || hasNextPage,
  };

  React.useEffect(() => {
    if (page !== 1 && isMounted.current) {
      queryClient.cancelQueries({ queryKey: [queryKey] });
      setPage(1);
    }
    // hook should run only when queryName has changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryKey]);

  React.useEffect(() => {
    window.setTimeout(() => {
      isMounted.current = true;
    }, 0);
  }, []);

  return { ...queryResult, pagination };
}
