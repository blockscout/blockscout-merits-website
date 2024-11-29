export type ChainId = string;

export interface Chain {
  explorerUrl: string;
}

export interface Chains {
  [chainId: ChainId]: Chain;
}
