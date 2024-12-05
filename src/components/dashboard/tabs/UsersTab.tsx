import UsersTable from "~/components/users/UsersTable";

import useUsersQuery from "~/hooks/useUsersQuery";

export default function UsersTab() {
  const usersQuery = useUsersQuery();

  return <UsersTable users={usersQuery.data?.items || []} />;
}
