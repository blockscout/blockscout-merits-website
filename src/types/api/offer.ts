export interface Offer {
  offer_id: string;
  details: {
    title: string;
    description: string;
    type: "booster" | "badge" | "discount" | "access";
    image_url: string;
    steps:
      | {
          title: string;
          description: string;
        }[]
      | [];
  };
  price: string;
  weight: number;
  valid_since: string;
  valid_until: string | null;
  redemptions_limit: number;
  redemptions_count: number;
  is_valid: boolean;
  min_passport_score: string | null;
  is_hidden: boolean;
  is_unique_per_address: boolean;
  is_auto_filled: boolean;
}

export interface OffersResponse {
  items: Array<Offer>;
}

export interface OfferRedemption {
  offer_id: string;
  address: string;
  redemption: string;
  price: string;
  note: string;
  redeemed_at: string;
  secret: string;
}

export interface OfferRedemptionsResponse {
  items: Array<OfferRedemption>;
  next_page_params: OfferRedemptionsPagination | null;
}

export type OfferRedemptionsPagination = {
  page_token: string;
  page_size: number;
};
