export type NFTTokenType = "ERC-721" | "ERC-1155" | "ERC-404";
export type TokenType = "ERC-20" | NFTTokenType;

export interface TokenInfo<T extends TokenType = TokenType> {
  address: string;
  type: T;
  symbol: string | null;
  name: string | null;
  decimals: string | null;
  holders: string | null;
  exchange_rate: string | null;
  total_supply: string | null;
  icon_url: string | null;
  circulating_market_cap: string | null;
  // bridged token fields
  is_bridged?: boolean | null;
  bridge_type?: string | null;
  origin_chain_id?: string | null;
  foreign_address?: string | null;
  filecoin_robust_address?: string | null;
}

export interface TokenInstance {
  is_unique: boolean;
  id: string;
  holder_address_hash: string | null;
  image_url: string | null;
  animation_url: string | null;
  external_app_url: string | null;
  metadata: Record<string, unknown> | null;
  owner: string | null;
}

export interface TokenInventoryResponse {
  items: Array<TokenInstance>;
  next_page_params: TokenInventoryPagination | null;
}

export type TokenInventoryPagination = {
  unique_token: number;
};
