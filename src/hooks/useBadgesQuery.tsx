import { useQuery } from "@tanstack/react-query";
import { uniq } from "lodash";

import type {
  TokenInventoryResponse,
  TokenInfo,
  TokenInstance,
} from "~/types/api/token";
import type { Badge } from "~/types/badge";

import { useAppContext } from "~/contexts/app";

import badgesStub from "~/stubs/badges";

type BadgeConfig = {
  collectionId: string | { [tokenId: TokenInstance["id"]]: string };
  name: string | { [tokenId: TokenInstance["id"]]: string };
  chainId: string;
  isAnimated?: boolean;
};

type BadgesConfig = { [address: TokenInfo["address"]]: Badge };

const BADGES_API_URL = "https://badges.blockscout.com";
const CHAINS_API_URL = "https://chains.blockscout.com";

export default function useBadgesQuery() {
  const { address: userAddress } = useAppContext();

  return useQuery({
    queryKey: ["badges", userAddress],
    queryFn: async () => {
      const userBadges: Badge[] = [];

      const badges: BadgesConfig = await fetch(
        `${BADGES_API_URL}/api/badges`,
      ).then((res) => res.json());

      const chainIds = uniq(
        Object.values(badges).map(({ chainId }) => chainId),
      );

      const chains = await Promise.all(
        chainIds.map(
          (chainId): Promise<any> =>
            fetch(`${CHAINS_API_URL}/api/chains/${chainId}`).then((res) =>
              res.json(),
            ),
        ),
      );

      const chainExplorers = Object.fromEntries(
        chainIds.map((chainId, index) => [
          chainId,
          chains[index].explorers[0].url.replace(/\/$/, ""),
        ]),
      );

      function getBadgePropValue(
        prop: keyof BadgeConfig,
        address: keyof BadgesConfig,
        tokenId: string,
      ) {
        const badge = badges[address];

        if (
          typeof badge[prop] === "string" ||
          typeof badge[prop] === "boolean"
        ) {
          return badge[prop];
        }

        return badge[prop]?.[tokenId] || badge[prop];
      }

      await Promise.all(
        Object.entries(badges).map(
          async ([tokenAddress, { chainId, isAnimated }]) => {
            try {
              let nextPageParams = null;

              do {
                const url = new URL(
                  `${chainExplorers[chainId]}/api/v2/tokens/${tokenAddress}/instances`,
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
                  const metadata = tokenInstance.metadata as Record<
                    string,
                    unknown
                  >;
                  const attributes = Array.isArray(metadata?.attributes)
                    ? (metadata.attributes as [
                        { trait_type: string; value: string },
                      ])
                    : [];
                  const description =
                    typeof metadata?.description === "string"
                      ? metadata.description
                      : "";
                  const rarity =
                    (attributes
                      ?.find((attr) => attr.trait_type === "rarity")
                      ?.value?.replace("_", "-") as Badge["rarity"]) || "epic";

                  userBadges.push({
                    chainId,
                    id: tokenInstance.id,
                    address: tokenAddress,
                    collectionId: getBadgePropValue(
                      "collectionId",
                      tokenAddress,
                      tokenInstance.id,
                    ) as string,
                    name: getBadgePropValue(
                      "name",
                      tokenAddress,
                      tokenInstance.id,
                    ) as string,
                    description,
                    rarity,
                    isAnimated,
                    explorerUrl: chainExplorers[chainId],
                  });
                });

                nextPageParams = data.next_page_params;
              } while (nextPageParams);
            } catch (error) {
              console.error(error);
            }
          },
        ),
      );

      return userBadges.sort((a, b) => {
        const addresses = Object.keys(badges);
        const [aIndex, bIndex] = [
          addresses.indexOf(a.address),
          addresses.indexOf(b.address),
        ];
        return aIndex !== bIndex
          ? aIndex - bIndex
          : Number(a.id) - Number(b.id);
      });
    },
    placeholderData: badgesStub,
    enabled: Boolean(userAddress),
  });
}
