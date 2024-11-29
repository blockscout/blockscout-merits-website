import type { TokenInfo, TokenInstance } from "~/types/api/token";

type Badge = {
  collectionId: string | { [tokenId: TokenInstance["id"]]: string };
  name: string | { [tokenId: TokenInstance["id"]]: string };
  chainId: string;
};

type Badges = { [address: TokenInfo["address"]]: Badge };

const badges: Badges = {
  "0xD0B816CFBDaaB92d34227985fceDD438A390B461": {
    collectionId: "bangkok-hacker-badge",
    name: "Bangkok Hacker",
    chainId: "8453",
  },
  "0xFbd87AA99A0BB2352b7eC9BC9B6980B4e8E28bE7": {
    collectionId: "blockscout-galxe-fren-badge",
    name: "Galxe Fren",
    chainId: "8453",
  },
  "0x2E78487bb558Ca1564E2BA4E3dDbB29D960D5ed6": {
    collectionId: "swapscout-round-2-badge",
    name: "Swapscout. Round 2",
    chainId: "8453",
  },
  "0x75d6106B2FeeeF9843C2E6e837c4f8f96185f11D": {
    collectionId: "swapscout-pioneer-badge",
    name: "Swapscout Pioneer",
    chainId: "8453",
  },
  "0x45a71Fb32F70831E3B3098Af7C819e00BCE07BE1": {
    collectionId: "blockscout-gitcoin21-badge",
    name: "GitCoin21",
    chainId: "8453",
  },
  "0xc1064096c1Ec5C4C83d6020B13789E6d0B112A67": {
    collectionId: "blockscout-giveth-v1-badge",
    name: "Giveth V1",
    chainId: "8453",
  },
  "0xb6E0540bF1182f84B745B7525C23B68f8c4898c2": {
    collectionId: "blockscout-ratings-badge",
    name: "Dapps ratings",
    chainId: "8453",
  },
  "0x29D737d92469BfE0Bf9EE41c574BF533c379f7c6": {
    collectionId: "blockscout-smolrefuel-badge",
    name: "SmolRefuel",
    chainId: "8453",
  },
  "0xDC41A43c425363Dc8dd368219417b76aFa12BA7a": {
    collectionId: {
      "1": "blockscout-fren-badge",
      "2": "blockscout-alpha-scout",
    },
    name: {
      "1": "Blockscout Fren",
      "2": "Alpha Scout",
    },
    chainId: "7777777",
  },
};

export function getBadgePropValue(
  prop: keyof Badge,
  address: keyof Badges,
  tokenId: string,
) {
  const badge = badges[address];

  if (typeof badge[prop] === "string") {
    return badge[prop];
  }

  return badge[prop]?.[tokenId] || "";
}

export default badges;
