import { Tr, Td, Link, Flex, Text, Image } from "@chakra-ui/react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

import type { User } from "~/types/api/user";

import Skeleton from "~/chakra/Skeleton";
import MeritsIcon from "../MeritsIcon";

const medals = ["gold", "silver", "bronze"] as const;

type Props = {
  user: User;
  isLoading?: boolean;
};

export default function UsersTableItem({ user, isLoading }: Props) {
  const date = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(user.registered_at));

  return (
    <Tr>
      <Td>
        <Skeleton isLoaded={!isLoading} display="inline-block">
          <Flex alignItems="center" gap={4}>
            <Text minW="10px">{user.rank}</Text>
            {medals[Number(user.rank) - 1] && (
              <Image
                src={`static/medals/${medals[Number(user.rank) - 1]}.svg`}
                boxSize={5}
              />
            )}
          </Flex>
        </Skeleton>
      </Td>
      <Td>
        <Skeleton isLoaded={!isLoading} display="inline-block">
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
      <Td isNumeric>
        <Skeleton isLoaded={!isLoading} display="inline-block">
          {date}
        </Skeleton>
      </Td>
      <Td isNumeric>
        <Skeleton isLoaded={!isLoading} display="inline-block">
          {user.referrals}
        </Skeleton>
      </Td>
      <Td isNumeric>
        <Skeleton isLoaded={!isLoading} display="inline-block">
          <Flex alignItems="center" gap={2}>
            <MeritsIcon boxSize={5} noShadow />
            <Text>{user.total_balance}</Text>
          </Flex>
        </Skeleton>
      </Td>
    </Tr>
  );
}
