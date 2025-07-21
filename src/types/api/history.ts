export interface HistoryItem {
  action: string;
  details: {
    amount: string;
    manual_id?: string;
    description?: string;
    offer_id?: string;
    activity?: string;
  };
  timestamp: string;
}

export interface HistoryResponse {
  items: Array<HistoryItem>;
}
