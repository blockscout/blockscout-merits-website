import { useQuery } from "@tanstack/react-query";

import { useAppContext } from "~/contexts/app";
import { getApiUrl } from "~/config/app";

export default function useDailyRewardQuery() {
  const { apiToken } = useAppContext();

  return useQuery({
    queryKey: ["daily_reward", apiToken],
    queryFn: async () => {
      const response = await fetch(getApiUrl("/user/daily/check"), {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      });
      return response.json();
    },
    enabled: Boolean(apiToken),
  });
}
