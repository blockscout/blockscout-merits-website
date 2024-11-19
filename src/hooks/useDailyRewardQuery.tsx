import { useQuery } from "@tanstack/react-query";

import { useAppContext } from "~/contexts/app";

export default function useDailyRewardQuery() {
  const { apiToken } = useAppContext();

  return useQuery({
    queryKey: ["daily_reward", apiToken],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/v1/user/daily/check`,
        {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
        },
      );
      return response.json();
    },
    enabled: Boolean(apiToken),
  });
}
