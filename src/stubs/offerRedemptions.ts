import type { OfferRedemptionsResponse } from "~/types/api/offer";

export default {
  items: Array.from({ length: 3 }, () => ({
    offer_id: "test",
    address: "0x0000000000000000000000000000000000000000",
    redemption: "test",
    price: "1000",
    note: "",
    redeemed_at: "2025-01-20T00:00:00.000Z",
    secret: "TESTTEST",
  })),
  next_page_params: {
    page_token: "0",
    page_size: 50,
  },
} as OfferRedemptionsResponse;
