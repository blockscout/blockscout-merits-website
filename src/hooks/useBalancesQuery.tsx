import { useQuery } from "@tanstack/react-query";

import { useAppContext } from "~/contexts/app";
import { getApiUrl } from "~/config/app";

export default function useBalancesQuery() {
  const { apiToken } = useAppContext();

  return useQuery({
    queryKey: ["balances", apiToken],
    queryFn: async () => {
      const response = await fetch(getApiUrl("/user/balances"), {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      });
      return response.json();
    },
    enabled: Boolean(apiToken),
  });
}
