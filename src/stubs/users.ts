import type { UsersResponse } from "~/types/api/user";

export default {
  items: Array.from({ length: 10 }, () => ({
    address: "0x0000000000000000000000000000000000000000",
    referrals: "100",
    rank: "100",
    top_percent: 0,
    registered_at: new Date().toISOString(),
    total_balance: "100",
  })),
  next_page_params: null,
} as UsersResponse;
