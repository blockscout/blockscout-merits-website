import { useQuery } from "@tanstack/react-query";

import type { Offer } from "~/types/api/offer";

import { useAppContext } from "~/contexts/app";
import { getApiUrl } from "~/config/app";

export default function useReferralsQuery(offer: Offer) {
  const { apiToken } = useAppContext();

  return useQuery({
    queryKey: ["check redeem", apiToken, offer],
    queryFn: async () => {
      const response = await fetch(getApiUrl("/user/offers/check-redeem"), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          offer_id: offer.offer_id,
          expected_price: offer.price,
          note: "",
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to check redeem");
      }
      return (await response.json()) as {
        is_redeemable: boolean;
        reason: string;
      };
    },
    enabled: Boolean(apiToken),
  });
}
