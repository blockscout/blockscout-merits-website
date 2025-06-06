import { Table, Tbody, Tr, Th, Flex } from "@chakra-ui/react";
import { useMemo } from "react";

import type { User } from "~/types/api/user";

import EmptyState from "~/components/shared/EmptyState";
import Thead from "~/components/shared/TheadSticky";
import SpriteIcon from "~/components/shared/SpriteIcon";

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
  const groupedByRank = useMemo(
    () =>
      Object.entries(Object.groupBy(users, ({ rank }) => rank)).map(
        ([_, grouped]) => grouped as User[],
      ),
    [users],
  );

  return (
    <>
      <Table>
        <Thead top={80}>
          <Tr
            sx={{
              "& > th": {
                color: "blackAlpha.800",
              },
            }}
          >
            <Th w="10%">Rank</Th>
            <Th w="50%">Address</Th>
            <Th w="15%">Registration</Th>
            <Th isNumeric w="10%">
              Referrals
            </Th>
            <Th isNumeric w="15%">
              <Flex alignItems="center" justifyContent="flex-end" gap={2}>
                <SpriteIcon name="merits-outline" boxSize={5} />
                Merits
              </Flex>
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
          {groupedByRank.map((users) =>
            users.map((user, index) => (
              <UserTableItem
                key={index}
                user={user}
                indexInGroup={index}
                groupSize={users.length}
                isLoading={isLoadingUsers}
              />
            )),
          )}
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
