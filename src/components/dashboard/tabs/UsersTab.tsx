import React, { useCallback, useState } from "react";
import { isAddress } from "viem";

import Users from "~/components/users/Users";
import FilterInput from "~/components/shared/filters/FilterInput";
import Pagination from "~/components/shared/pagination/Pagination";
import ActionBar from "~/components/shared/ActionBar";

import { useAppContext } from "~/contexts/app";
import useUsersQuery from "~/hooks/useUsersQuery";
import useUserQuery from "~/hooks/useUserQuery";

export default function UsersTab() {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const { address } = useAppContext();
  const usersQuery = useUsersQuery(scrollRef);
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
      <div ref={scrollRef}></div>
      <ActionBar
        flexDirection={{ base: "column-reverse", md: "row" }}
        alignItems={{ base: "flex-end", md: "center" }}
        py={{ base: 3, md: 6 }}
        mt={{ base: -3, md: -6 }}
        gap={3}
      >
        <FilterInput
          size="xs"
          placeholder="Search by address"
          w={{ base: "full", md: "400px" }}
          onChange={handleSearchAddressChange}
        />
        <Pagination
          {...usersQuery.pagination}
          page={searchAddress ? 1 : usersQuery.pagination.page}
          isLoading={searchAddress ? true : usersQuery.pagination.isLoading} // to disable the pagination
          hasPages={searchAddress ? true : usersQuery.pagination.hasPages}
        />
      </ActionBar>
      <Users
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
