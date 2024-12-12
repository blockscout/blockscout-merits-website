import { useQuery } from "@tanstack/react-query";

import { User } from "~/types/api/user";

import { getApiUrl } from "~/config/app";

import usersStub from "~/stubs/users";

export default function useUserQuery(address?: string) {
  return useQuery({
    queryKey: ["user", address],
    queryFn: async () => {
      const response = await fetch(getApiUrl(`/leaderboard/users/${address}`));
      return (await response.json()) as User;
    },
    enabled: Boolean(address),
    placeholderData: usersStub.items[0],
  });
}
