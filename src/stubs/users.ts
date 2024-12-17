import type { UsersResponse } from "~/types/api/user";

export default {
  items: Array.from({ length: 10 }, (_, i) => ({
    address: "0x0000000000000000000000000000000000000000",
    referrals: "1000",
    rank: (1000 + i).toString(),
    top_percent: 0,
    registered_at: new Date().toISOString(),
    total_balance: "1000",
  })),
  next_page_params: {
    page_token: "0",
    page_size: 50,
  },
} as UsersResponse;
