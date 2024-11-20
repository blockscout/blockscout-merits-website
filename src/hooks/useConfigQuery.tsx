import { useQuery } from "@tanstack/react-query";

import { getApiUrl } from "~/config/app";

export default function useConfigQuery() {
  return useQuery({
    queryKey: ["config"],
    queryFn: async () => {
      const response = await fetch(getApiUrl("/config"));
      return response.json();
    },
  });
}
