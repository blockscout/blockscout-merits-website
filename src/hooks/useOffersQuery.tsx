import React from "react";

import type { OffersResponse } from "~/types/api/offer";

import { getApiUrl } from "~/config/app";
import offersStub from "~/stubs/offers";

import useQueryWithPages from "./useQueryWithPages";

export default function useOffersQuery(
  scrollRef?: React.RefObject<HTMLDivElement>,
) {
  return useQueryWithPages<OffersResponse>({
    queryKey: "offers",
    url: getApiUrl("/offers"),
    params: { page_size: 50 },
    placeholderData: offersStub,
    scrollRef,
  });
}
