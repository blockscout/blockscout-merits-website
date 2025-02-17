import type { ChainId } from "./chain";

export interface Badge {
  chainId: ChainId;
  id: string;
  collectionId: string;
  address: string;
  name: string;
  description: string;
  rarity: "regular" | "rare" | "super-rare" | "legend" | "epic";
  isAnimated?: boolean;
  explorerUrl: string;
}
