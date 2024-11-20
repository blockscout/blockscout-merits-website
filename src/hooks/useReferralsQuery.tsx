import { useQuery } from "@tanstack/react-query";

import { useAppContext } from "~/contexts/app";
import { getApiUrl } from "~/config/app";

export default function useReferralsQuery() {
  const { apiToken } = useAppContext();

  return useQuery({
    queryKey: ["referrals", apiToken],
    queryFn: async () => {
      const response = await fetch(getApiUrl("/user/referrals"), {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      });
      return response.json();
    },
    enabled: Boolean(apiToken),
  });
}
