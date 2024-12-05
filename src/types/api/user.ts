export interface User {
  address: string;
  referrals: string;
  rank: string;
  top_percent: number;
}

export interface UsersResponse {
  items: Array<User>;
  next_page_params: UsersPagination | null;
}

export type UsersPagination = {
  page_token: string;
  page_size: number;
};
