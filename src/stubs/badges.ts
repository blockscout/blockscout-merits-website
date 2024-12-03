import type { Badge } from "~/types/badge";

export default Array.from({ length: 5 }, (_, i) => ({
  chainId: "8453",
  id: `badge-${i}`,
  collectionId: "collection-0",
  address: "0x0000000000000000000000000000000000000000",
  name: `Badge ${i}`,
  description: `Badge ${i} description`,
  rarity: "regular",
})) as Badge[];
