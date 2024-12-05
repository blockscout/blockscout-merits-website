import { Tr, Td, Link, Flex, Text } from "@chakra-ui/react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

import type { IconName } from "~/components/SpriteIcon";
import type { User } from "~/types/api/user";

import SpriteIcon from "~/components/SpriteIcon";

const medals: Record<string, IconName> = {
  "1": "medals/gold",
  "2": "medals/silver",
  "3": "medals/bronze",
};

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
            {medals[user.rank] && (
              <SpriteIcon name={medals[user.rank]} boxSize={5} />
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
