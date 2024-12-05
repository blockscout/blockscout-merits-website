import { useQuery } from "@tanstack/react-query";

import type { UsersResponse } from "~/types/api/user";

import { getApiUrl } from "~/config/app";

export default function useUsersQuery() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch(
        getApiUrl("/leaderboard/users?page_size=10"),
      );
      return (await response.json()) as UsersResponse;
    },
  });
}
