import { Flex, Link, Text, Image, Tag } from "@chakra-ui/react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

import type { User } from "~/types/api/user";

import Skeleton from "~/chakra/Skeleton";
import MeritsIcon from "~/components/MeritsIcon";
import formatDate from "~/lib/formatDate";

import { medals, getPercentOfUsersBelow } from "./utils";

type Props = {
  user: User;
  prevRank?: string;
  nextRank?: string;
  isLoading?: boolean;
  isSelf?: boolean;
};

export default function UsersListItem({ user, isLoading, isSelf }: Props) {
  return (
    <Flex
      flexDirection="column"
      fontSize="sm"
      fontWeight="500"
      gap={3}
      py={4}
      borderBottom="1px solid"
      borderColor="divider"
      _first={{ borderTop: "1px solid", borderColor: "divider" }}
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Skeleton isLoaded={!isLoading} as={Flex} alignItems="center" gap={1.5}>
          <Jazzicon diameter={16} seed={jsNumberForAddress(user.address)} />
          <Link
            href={`https://eth.blockscout.com/address/${user.address}`}
            isExternal
            fontWeight={isSelf ? "600" : "500"}
          >
            {user.address.slice(0, 4)}...{user.address.slice(-4)}
          </Link>
        </Skeleton>
        <Skeleton isLoaded={!isLoading} as={Flex} alignItems="center" gap={2}>
          <Text minW="10px" fontWeight={isSelf ? "600" : "500"}>
            Rank: {user.rank}
          </Text>
          {medals[Number(user.rank) - 1] && (
            <Image
              src={`static/medals/${medals[Number(user.rank) - 1]}.svg`}
              boxSize={5}
            />
          )}
        </Skeleton>
      </Flex>
      {isSelf && (
        <Flex alignItems="center" justifyContent="space-between">
          <Skeleton isLoaded={!isLoading}>
            <Tag colorScheme="blue">You</Tag>
          </Skeleton>
          <Skeleton isLoaded={!isLoading}>
            <Tag colorScheme="purple">
              Rank higher than {getPercentOfUsersBelow(user.top_percent)}% of
              users
            </Tag>
          </Skeleton>
        </Flex>
      )}
      <Flex alignItems="center" justifyContent="space-between">
        <Skeleton isLoaded={!isLoading} as={Text}>
          Registration
        </Skeleton>
        <Skeleton
          isLoaded={!isLoading}
          as={Text}
          fontWeight={isSelf ? "600" : "500"}
        >
          {formatDate(user.registered_at)}
        </Skeleton>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between">
        <Skeleton isLoaded={!isLoading} as={Text}>
          Referrals
        </Skeleton>
        <Skeleton
          isLoaded={!isLoading}
          as={Text}
          fontWeight={isSelf ? "600" : "500"}
        >
          {user.referrals}
        </Skeleton>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between">
        <Skeleton isLoaded={!isLoading} as={Text}>
          Merits
        </Skeleton>
        <Skeleton isLoaded={!isLoading} as={Flex} alignItems="center" gap={2}>
          <MeritsIcon boxSize={5} noShadow />
          <Text fontWeight={isSelf ? "600" : "500"}>{user.total_balance}</Text>
        </Skeleton>
      </Flex>
    </Flex>
  );
}
