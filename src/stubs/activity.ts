import type { ActivityResponse } from "~/types/api/activity";

export default {
  items: [
    {
      date: "2025-03-10",
      end_date: "2025-03-16",
      activity: "sent_transactions",
      amount: "100",
      percentile: "50",
      is_pending: true,
    },
    {
      date: "2025-03-10",
      end_date: "2025-03-16",
      activity: "verified_contracts",
      amount: "350",
      percentile: "20",
      is_pending: true,
    },
    {
      date: "2025-03-10",
      end_date: "2025-03-16",
      activity: "blockscout_usage",
      amount: "500",
      percentile: "30",
      is_pending: true,
    },
  ],
  last_week: [
    {
      date: "2025-03-03",
      end_date: "2025-03-09",
      activity: "sent_transactions",
      amount: "50",
      percentile: "25",
      is_pending: false,
    },
    {
      date: "2025-03-03",
      end_date: "2025-03-09",
      activity: "verified_contracts",
      amount: "200",
      percentile: "15",
      is_pending: false,
    },
    {
      date: "2025-03-03",
      end_date: "2025-03-09",
      activity: "blockscout_usage",
      amount: "300",
      percentile: "20",
      is_pending: false,
    },
  ],
} as ActivityResponse;
