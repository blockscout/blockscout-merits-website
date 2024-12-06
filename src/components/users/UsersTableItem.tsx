import { Tr, Td, Link, Flex, Text, Image } from "@chakra-ui/react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

import type { User } from "~/types/api/user";

const medals = ["gold", "silver", "bronze"] as const;

type Props = {
  user: User;
  prevRank: string;
  nextRank: string;
};

export default function UsersTableItem({ user, prevRank, nextRank }: Props) {
  const borderBottom = nextRank === user.rank ? "none" : undefined;

  return (
    <Tr>
      <Td borderBottom={borderBottom}>
        {user.rank !== prevRank && (
          <Flex alignItems="center" gap={4}>
            <Text minW="10px">{user.rank}</Text>
            {medals[Number(user.rank) - 1] && (
              <Image
                src={`static/medals/${medals[Number(user.rank) - 1]}.svg`}
                boxSize={5}
              />
            )}
          </Flex>
        )}
      </Td>
      <Td borderBottom={borderBottom}>
        <Flex alignItems="center" gap={1.5}>
          <Jazzicon diameter={16} seed={jsNumberForAddress(user.address)} />
          <Link
            href={`https://eth.blockscout.com/address/${user.address}`}
            isExternal
          >
            {user.address}
          </Link>
        </Flex>
      </Td>
      <Td isNumeric borderBottom={borderBottom}>
        {user.referrals}
      </Td>
      <Td isNumeric borderBottom={borderBottom}>
        {user.top_percent}%
      </Td>
    </Tr>
  );
}
