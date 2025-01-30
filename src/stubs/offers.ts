import type { Offer } from "~/types/api/offer";

export default Array.from({ length: 4 }, (_, i) => ({
  offer_id: `offer-${i}`,
  details: {
    title: `Offer ${i}`,
    description:
      "Description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    type: "booster",
    image_url: "https://example.com",
    steps: [],
  },
  price: "100000",
  weight: 10,
  valid_since: "2025-01-20T00:00:00.000Z",
  valid_until: "2025-02-15T00:00:00.000Z",
  redemptions_limit: 1000,
  redemptions_count: 431,
  is_valid: true,
  is_hidden: false,
  is_unique_per_address: false,
  is_auto_filled: false,
})) as Array<Offer>;
