import { Image } from "@chakra-ui/react";

import type { User } from "~/types/api/user";

const medals = ["gold", "silver", "bronze"] as const;

export default function Medal({ rank }: { rank: User["rank"] }) {
  const index = Number(rank) - 1;

  return medals[index] ? (
    <Image
      src={`static/medals/${medals[index]}.svg`}
      alt={`medal-${medals[index]}`}
      boxSize={5}
    />
  ) : null;
}
