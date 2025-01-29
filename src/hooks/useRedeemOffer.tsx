import { useCallback } from "react";

import type { Offer } from "~/types/api/offer";

import { useAppContext } from "~/contexts/app";
import { getApiUrl } from "~/config/app";

export default function useRedeemOffer() {
  const { apiToken } = useAppContext();

  return useCallback(
    async (offer: Offer) => {
      await (fetch(getApiUrl("/user/offers/redeem"), {
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
      }).then((response) => response.json()) as Promise<{ secret?: string }>);
    },
    [apiToken],
  );
}
