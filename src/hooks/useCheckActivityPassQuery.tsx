import { useQuery } from "@tanstack/react-query";

import { getApiUrl } from "~/config/app";
import { useAppContext } from "~/contexts/app";

export default function useCheckActivityPassQuery() {
  const { address } = useAppContext();

  return useQuery({
    queryKey: ["check_activity_pass", address],
    queryFn: async () => {
      const response = await fetch(
        getApiUrl(`/activity/check-pass?address=${address}`),
      );
      return response.json();
    },
    enabled: Boolean(address),
  });
}
