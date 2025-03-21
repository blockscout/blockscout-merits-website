import { useQuery } from "@tanstack/react-query";

import type { InstancesResponse } from "~/types/api/instances";

import { getApiUrl } from "~/config/app";

export default function useActivityQuery() {
  return useQuery({
    queryKey: ["instances"],
    queryFn: async () => {
      const response = await fetch(getApiUrl("/instances"));
      return (await response.json()) as InstancesResponse;
    },
  });
}
