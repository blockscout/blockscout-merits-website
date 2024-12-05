import { Table, Thead, Tbody, Tr, Th } from "@chakra-ui/react";

import type { User } from "~/types/api/user";

import UserTableItem from "./UsersTableItem";

type Props = {
  users: User[];
};

export default function UsersTable({ users }: Props) {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th w="10%">Rank</Th>
          <Th w="70%">Address</Th>
          <Th isNumeric w="10%">
            Referrals
          </Th>
          <Th isNumeric w="10%">
            Merits
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {users?.map((user, index, array) => (
          <UserTableItem
            key={index}
            user={user}
            prevRank={array[index - 1]?.rank}
            nextRank={array[index + 1]?.rank}
          />
        ))}
      </Tbody>
    </Table>
  );
}
