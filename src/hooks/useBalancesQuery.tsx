import { useQuery } from "@tanstack/react-query";

import { useAppContext } from "~/contexts/app";

export default function useBalancesQuery() {
  const { apiToken } = useAppContext();

  return useQuery({
    queryKey: ["balances", apiToken],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/v1/user/balances`,
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
