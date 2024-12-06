import { Flex } from "@chakra-ui/react";

import UsersTable from "~/components/users/UsersTable";
import FilterInput from "~/components/shared/filters/FilterInput";
import Pagination from "~/components/shared/pagination/Pagination";

import useUsersQuery from "~/hooks/useUsersQuery";

export default function UsersTab() {
  const usersQuery = useUsersQuery();

  return (
    <>
      <Flex justifyContent="space-between" mb={6}>
        <FilterInput size="xs" placeholder="Search by address" w="400px" />
        <Pagination {...usersQuery.pagination} />
      </Flex>
      <UsersTable
        users={usersQuery.data?.items || []}
        isLoading={usersQuery.isPlaceholderData}
      />
    </>
  );
}
