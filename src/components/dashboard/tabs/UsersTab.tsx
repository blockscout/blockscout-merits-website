import { Flex } from "@chakra-ui/react";

import UsersTable from "~/components/users/UsersTable";
import FilterInput from "~/components/shared/filters/FilterInput";
import Pagination from "~/components/shared/pagination/Pagination";

import { useAppContext } from "~/contexts/app";
import useUsersQuery from "~/hooks/useUsersQuery";
import useUserQuery from "~/hooks/useUserQuery";

export default function UsersTab() {
  const { address } = useAppContext();
  const usersQuery = useUsersQuery();
  const userQuery = useUserQuery(address);

  return (
    <>
      <Flex justifyContent="space-between" mb={6}>
        <FilterInput size="xs" placeholder="Search by address" w="400px" />
        <Pagination {...usersQuery.pagination} />
      </Flex>
      <UsersTable
        user={address ? userQuery.data : undefined}
        isLoadingUser={userQuery.isPlaceholderData}
        users={usersQuery.data?.items || []}
        isLoadingUsers={usersQuery.isPlaceholderData}
      />
    </>
  );
}
