import React from "react";

import type { UsersResponse } from "~/types/api/user";

import { getApiUrl } from "~/config/app";
import usersStub from "~/stubs/users";

import useQueryWithPages from "./useQueryWithPages";

export default function useUsersQuery(
  scrollRef: React.RefObject<HTMLDivElement>,
) {
  return useQueryWithPages<UsersResponse>({
    queryKey: "users",
    url: getApiUrl("/leaderboard/users"),
    params: { page_size: 50 },
    placeholderData: usersStub,
    scrollRef,
  });
}
