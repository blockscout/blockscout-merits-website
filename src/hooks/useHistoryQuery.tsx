import { useQuery } from "@tanstack/react-query";

import type { HistoryResponse } from "~/types/api/history";

import { getApiUrl } from "~/config/app";
import { useAppContext } from "~/contexts/app";
import historyStub from "~/stubs/history";

export default function useHistoryQuery() {
  const { apiToken } = useAppContext();

  return useQuery({
    queryKey: ["history", apiToken],
    queryFn: async () => {
      const response = await fetch(getApiUrl("/user/logs"), {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      });
      const data = (await response.json()) as HistoryResponse;
      return data;
    },
    placeholderData: historyStub,
    enabled: Boolean(apiToken),
  });
}
