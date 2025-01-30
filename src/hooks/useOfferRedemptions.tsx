import type { Offer, OfferRedemptionsResponse } from "~/types/api/offer";

import { getApiUrl } from "~/config/app";
import { useAppContext } from "~/contexts/app";
import offerRedemptionsStub from "~/stubs/offerRedemptions";

import useQueryWithPages from "./useQueryWithPages";

export default function useOfferRedemptionsQuery(offerId: Offer["offer_id"]) {
  const { apiToken } = useAppContext();

  return useQueryWithPages<OfferRedemptionsResponse>({
    queryKey: "offer redemptions",
    url: getApiUrl("/user/offers/redemptions"),
    params: { page_size: 50, offer_id: offerId },
    headers: { Authorization: `Bearer ${apiToken}` },
    placeholderData: offerRedemptionsStub,
  });
}
