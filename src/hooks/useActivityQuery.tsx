import { useQuery } from "@tanstack/react-query";

import type { ActivityResponse } from "~/types/api/activity";

import { useAppContext } from "~/contexts/app";
import { getApiUrl } from "~/config/app";
import activityStub from "~/stubs/activity";

export default function useActivityQuery() {
  const { apiToken } = useAppContext();

  return useQuery({
    queryKey: ["activity", apiToken],
    queryFn: async () => {
      const response = await fetch(getApiUrl("/user/activity/rewards"), {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      });
      return (await response.json()) as ActivityResponse;
    },
    enabled: Boolean(apiToken),
    placeholderData: activityStub,
  });
}
