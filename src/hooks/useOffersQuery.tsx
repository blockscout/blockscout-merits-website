import { useQuery } from "@tanstack/react-query";

import offersStub from "~/stubs/offers";

export default function useOffersQuery() {
  return useQuery({
    queryKey: ["offers"],
    queryFn: async () => {
      return offersStub;
    },
    placeholderData: offersStub.slice(0, 4),
  });
}
