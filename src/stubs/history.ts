import type { HistoryResponse } from "~/types/api/history";

export default {
  items: Array.from({ length: 3 }, (_, i) => ({
    action: "redeem",
    details: {
      amount: "10000",
      manual_id: "1234567890",
      description: "Redeemed offer",
    },
    timestamp: "2025-01-20T00:00:00.000Z",
  })),
} as HistoryResponse;
