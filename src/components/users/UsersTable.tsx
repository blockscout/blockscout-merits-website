import { Table, Thead, Tbody, Tr, Th } from "@chakra-ui/react";

import type { User } from "~/types/api/user";

import UserTableItem from "./UsersTableItem";

type Props = {
  user?: User;
  isLoadingUser: boolean;
  users: User[];
  isLoadingUsers: boolean;
};

export default function UsersTable({
  user,
  isLoadingUser,
  users,
  isLoadingUsers,
}: Props) {
  return (
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
        {user && (
          <UserTableItem
            key="self"
            user={user}
            isSelf
            isLoading={isLoadingUser}
          />
        )}
        {users?.map((user, index) => (
          <UserTableItem key={index} user={user} isLoading={isLoadingUsers} />
        ))}
      </Tbody>
    </Table>
  );
}
