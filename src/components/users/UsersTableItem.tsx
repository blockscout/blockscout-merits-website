import { Tr, Td, Link, Flex, Text, Image } from "@chakra-ui/react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

import type { User } from "~/types/api/user";

import Skeleton from "~/chakra/Skeleton";

const medals = ["gold", "silver", "bronze"] as const;

type Props = {
  user: User;
  prevRank: string;
  nextRank: string;
  isLoading?: boolean;
};

export default function UsersTableItem({
  user,
  prevRank,
  nextRank,
  isLoading,
}: Props) {
  const borderBottom =
    nextRank === user.rank ? "1px solid transparent" : undefined;

  return (
    <Tr>
      <Td borderBottom={borderBottom}>
        <Skeleton isLoaded={!isLoading}>
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
        </Skeleton>
      </Td>
      <Td borderBottom={borderBottom}>
        <Skeleton isLoaded={!isLoading}>
          <Flex alignItems="center" gap={1.5}>
            <Jazzicon diameter={16} seed={jsNumberForAddress(user.address)} />
            <Link
              href={`https://eth.blockscout.com/address/${user.address}`}
              isExternal
            >
              {user.address}
            </Link>
          </Flex>
        </Skeleton>
      </Td>
      <Td isNumeric borderBottom={borderBottom}>
        <Skeleton isLoaded={!isLoading}>{user.referrals}</Skeleton>
      </Td>
      <Td isNumeric borderBottom={borderBottom}>
        <Skeleton isLoaded={!isLoading}>{user.top_percent}%</Skeleton>
      </Td>
    </Tr>
  );
}
