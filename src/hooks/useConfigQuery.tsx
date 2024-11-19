import { useQuery } from "@tanstack/react-query";

export default function useConfigQuery() {
  return useQuery({
    queryKey: ["config"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/v1/config`,
      );
      return response.json();
    },
  });
}
