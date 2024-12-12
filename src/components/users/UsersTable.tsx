import { Table, Thead, Tbody, Tr, Th } from "@chakra-ui/react";

import type { User } from "~/types/api/user";

import EmptyState from "~/components/shared/EmptyState";

import UserTableItem from "./UsersTableItem";

type Props = {
  user?: User;
  isLoadingUser: boolean;
  users: User[];
  isLoadingUsers: boolean;
  isSearch?: boolean;
};

export default function UsersTable({
  user,
  isLoadingUser,
  users,
  isLoadingUsers,
  isSearch,
}: Props) {
  return (
    <>
      <Table>
        <Thead>
          <Tr>
            <Th w="10%">Rank</Th>
            <Th w="45%">Address</Th>
            <Th isNumeric w="15%">
              Registration
            </Th>
            <Th isNumeric w="15%">
              Referrals
            </Th>
            <Th isNumeric w="15%">
              Merits
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {user && !isSearch && (
            <UserTableItem
              key="self"
              user={user}
              isSelf
              isLoading={isLoadingUser}
            />
          )}
          {users.map((user, index, array) => (
            <UserTableItem
              key={index}
              user={user}
              prevRank={array[index - 1]?.rank}
              nextRank={array[index + 1]?.rank}
              isLoading={isLoadingUsers}
            />
          ))}
        </Tbody>
      </Table>
      {isSearch && !users.length && (
        <EmptyState
          image={{
            src: "/static/empty_search.svg",
            width: 240,
            height: 185,
          }}
          title="No results"
          description="Enter a full 0x address to search for a user on the leaderboard"
          maxW="500px"
          noBorder
        />
      )}
    </>
  );
}
