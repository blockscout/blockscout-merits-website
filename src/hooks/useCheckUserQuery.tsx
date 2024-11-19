import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

export default function useCheckUserQuery() {
  const { address } = useAccount();

  return useQuery({
    queryKey: ["check_user", address],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/v1/auth/user/${address}`,
      );
      return response.json();
    },
    enabled: Boolean(address),
  });
}
