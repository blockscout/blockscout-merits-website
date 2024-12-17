import { Flex, Text, Tag } from "@chakra-ui/react";

import type { User } from "~/types/api/user";

import Skeleton from "~/chakra/Skeleton";
import AddressEntity from "~/components/shared/AddressEntity";
import formatDate from "~/lib/formatDate";

import MeritsIcon from "~/components/MeritsIcon";
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
      _first={{ borderTop: "1px solid", borderTopColor: "divider" }}
      sx={{
        borderBottomColor: isSelf ? "blue.100" : "divider",
        position: "relative",
        _after: {
          display: isSelf ? "block" : "none",
          content: '""',
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "16px",
          bgGradient:
            "linear(180deg, rgba(190, 227, 248, 0) 0%, rgba(190, 227, 248, 0.2) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        },
      }}
    >
      <Flex alignItems="center" justifyContent="space-between">
        <AddressEntity
          address={user.address}
          isLoading={isLoading}
          isShort
          hasLink
          fontWeight="600"
        />
        <Skeleton isLoaded={!isLoading} as={Flex} alignItems="center" gap={2}>
          <Text minW="10px" fontWeight="600">
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
        <Skeleton isLoaded={!isLoading}>
          <Text variant="secondary">{formatDate(user.registered_at)}</Text>
        </Skeleton>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between">
        <Skeleton isLoaded={!isLoading} as={Text}>
          Referrals
        </Skeleton>
        <Skeleton isLoaded={!isLoading}>
          <Text variant="secondary">{user.referrals}</Text>
        </Skeleton>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between">
        <Skeleton isLoaded={!isLoading} as={Text}>
          Merits
        </Skeleton>
        <Skeleton isLoaded={!isLoading} display="inline-block">
          <Flex alignItems="center" gap={2}>
            <MeritsIcon boxSize={5} noShadow />
            <Text variant="secondary">{user.total_balance}</Text>
          </Flex>
        </Skeleton>
      </Flex>
    </Flex>
  );
}
