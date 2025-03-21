export interface Activity {
  date: string;
  end_date: string;
  activity: string;
  amount: string | null;
  percentile: string | null;
  is_pending: boolean;
}

export interface ActivityResponse {
  items: Array<Activity>;
  last_week: Array<Activity>;
}
