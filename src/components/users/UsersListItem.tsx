import { Flex, Text, Tag } from "@chakra-ui/react";

import type { User } from "~/types/api/user";

import Skeleton from "~/chakra/Skeleton";
import AddressEntity from "~/components/shared/AddressEntity";
import MeritsIcon from "~/components/MeritsIcon";
import formatDate from "~/lib/formatDate";

import Medal from "./Medal";

import { getPercentOfUsersBelow } from "./utils";

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
        <AddressEntity
          address={user.address}
          isLoading={isLoading}
          isShort
          hasLink
          fontWeight={isSelf ? "600" : "500"}
        />
        <Skeleton isLoaded={!isLoading} as={Flex} alignItems="center" gap={2}>
          <Text minW="10px" fontWeight={isSelf ? "600" : "500"}>
            Rank: {user.rank}
          </Text>
          <Medal rank={user.rank} />
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
