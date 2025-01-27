export interface Offer {
  offer_id: string;
  details: {
    name: string;
    description: string;
    type: "booster" | "badge" | "discount" | "access";
    image_url: string;
    steps: {
      title: string;
      description: string;
    }[];
  };
  price: string;
  weight: number;
  valid_since: string;
  valid_until: string;
  redemptions_limit: number;
  redemptions_count: number;
  is_valid: boolean;
  is_hidden: boolean;
  is_unique_per_address: boolean;
  is_auto_filled: boolean;
}

export interface OffersResponse {
  items: Array<Offer>;
  next_page_params: OffersPagination | null;
}

export type OffersPagination = {
  page_token: string;
  page_size: number;
};
