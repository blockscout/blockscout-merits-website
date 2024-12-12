import { Show, Hide, Flex } from "@chakra-ui/react";

import type { User } from "~/types/api/user";

import EmptyState from "~/components/shared/EmptyState";

import UsersTable from "./UsersTable";
import UsersListItem from "./UsersListItem";

type Props = {
  user?: User;
  isLoadingUser: boolean;
  users: User[];
  isLoadingUsers: boolean;
  isSearch?: boolean;
};

export default function Users({
  user,
  isLoadingUser,
  users,
  isLoadingUsers,
  isSearch,
}: Props) {
  return (
    <>
      <Show below="lg" ssr={false}>
        {isSearch && !users.length ? (
          <EmptyState
            image={{
              src: "/static/empty_search.svg",
              width: "240px",
              height: "185px",
            }}
            title="No results"
            description="Enter a full 0x address to search for a user on the leaderboard"
            maxW="500px"
            noBorder
          />
        ) : (
          <Flex flexDirection="column">
            {user && !isSearch && (
              <UsersListItem isSelf user={user} isLoading={isLoadingUser} />
            )}
            {users.map((item, index) => (
              <UsersListItem
                key={index}
                user={item}
                isLoading={isLoadingUsers}
              />
            ))}
          </Flex>
        )}
      </Show>
      <Hide below="lg" ssr={false}>
        <UsersTable
          user={user}
          isLoadingUser={isLoadingUser}
          users={users}
          isLoadingUsers={isLoadingUsers}
          isSearch={isSearch}
        />
      </Hide>
    </>
  );
}
