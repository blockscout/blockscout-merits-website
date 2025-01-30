import { useQuery } from "@tanstack/react-query";

import type { OffersResponse } from "~/types/api/offer";

import { getApiUrl } from "~/config/app";
import offersStub from "~/stubs/offers";

export default function useOffersQuery() {
  return useQuery({
    queryKey: ["offers"],
    queryFn: async () => {
      const response = await fetch(getApiUrl("/offers"));
      const data = (await response.json()) as OffersResponse;
      return data.items.sort((a, b) => Number(b.is_valid) - Number(a.is_valid));
    },
    placeholderData: offersStub,
  });
}
