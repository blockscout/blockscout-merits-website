import { useQuery } from "@tanstack/react-query";

import type { TokenInventoryResponse } from "~/types/api/token";

import { useAppContext } from "~/contexts/app";

import badges, { getBadgePropValue } from "~/config/badges";
import chains from "~/config/chains";

import badgesStub from "~/stubs/badges";

export default function useBadgesQuery() {
  const { address: userAddress } = useAppContext();

  return useQuery({
    queryKey: ["badges", userAddress],
    queryFn: async () => {
      const userBadges: any[] = [];

      await Promise.all(
        Object.entries(badges).map(async ([tokenAddress, { chainId }]) => {
          try {
            let nextPageParams = null;

            do {
              const url = new URL(
                `${chains[chainId].explorerUrl}/api/v2/tokens/${tokenAddress}/instances`,
              );

              const queryParams = {
                holder_address_hash: userAddress,
                ...nextPageParams,
              };

              Object.entries(queryParams).forEach(([key, value]) => {
                // there are some pagination params that can be null or false for the next page
                value !== undefined &&
                  value !== "" &&
                  url.searchParams.append(key, String(value));
              });

              const response = await fetch(url.toString());
              const data: TokenInventoryResponse = await response.json();

              if (!data.items) {
                return;
              }

              data.items.forEach((tokenInstance) => {
                const { attributes, description } =
                  tokenInstance.metadata || {};

                const rarity =
                  (attributes as [{ trait_type: string; value: string }])
                    ?.find((attr) => attr.trait_type === "rarity")
                    ?.value?.replace("_", "-") || "epic";

                userBadges.push({
                  chainId,
                  id: tokenInstance.id,
                  address: tokenAddress,
                  collectionId: getBadgePropValue(
                    "collectionId",
                    tokenAddress,
                    tokenInstance.id,
                  ),
                  name: getBadgePropValue(
                    "name",
                    tokenAddress,
                    tokenInstance.id,
                  ),
                  description,
                  rarity,
                });
              });

              nextPageParams = data.next_page_params;
            } while (nextPageParams);
          } catch (error) {
            console.error(error);
          }
        }),
      );

      return userBadges;
    },
    placeholderData: badgesStub,
    enabled: Boolean(userAddress),
  });
}
