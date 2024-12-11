import { Flex } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { isAddress } from "viem";

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

  const [searchAddress, setSearchAddress] = useState("");
  const isValidSearchAddress = isAddress(searchAddress);

  const searchUserQuery = useUserQuery(
    searchAddress && isValidSearchAddress ? searchAddress : undefined,
  );

  const handleSearchAddressChange = useCallback((value: string) => {
    setSearchAddress(value);
  }, []);

  return (
    <>
      <Flex justifyContent="space-between" mb={6}>
        <FilterInput
          size="xs"
          placeholder="Search by address"
          w="400px"
          onChange={handleSearchAddressChange}
        />
        <Pagination
          {...usersQuery.pagination}
          page={searchAddress ? 1 : usersQuery.pagination.page}
          isLoading={searchAddress ? true : usersQuery.pagination.isLoading} // to disable the pagination
          hasPages={searchAddress ? true : usersQuery.pagination.hasPages}
        />
      </Flex>
      <UsersTable
        user={address ? userQuery.data : undefined}
        isLoadingUser={userQuery.isPlaceholderData}
        users={
          searchAddress
            ? isValidSearchAddress && searchUserQuery.data
              ? [searchUserQuery.data]
              : []
            : usersQuery.data?.items || []
        }
        isLoadingUsers={
          searchAddress
            ? isValidSearchAddress && searchUserQuery.isPlaceholderData
            : usersQuery.isPlaceholderData
        }
        isSearch={Boolean(searchAddress)}
      />
    </>
  );
}
