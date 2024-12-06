import type { UsersResponse } from "~/types/api/user";

export default {
  items: Array.from({ length: 10 }, (_, i) => ({
    address: "0x0000000000000000000000000000000000000000",
    referrals: "0",
    rank: i.toString(),
    top_percent: 0,
  })),
  next_page_params: null,
} as UsersResponse;
