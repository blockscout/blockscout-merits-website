import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

import { getApiUrl } from "~/config/app";

export default function useCheckUserQuery() {
  const { address } = useAccount();

  return useQuery({
    queryKey: ["check_user", address],
    queryFn: async () => {
      const response = await fetch(getApiUrl(`/auth/user/${address}`));
      return response.json();
    },
    enabled: Boolean(address),
  });
}
