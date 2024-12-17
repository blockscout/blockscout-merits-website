import { Tr, Td, Flex, Text, Tag } from "@chakra-ui/react";

import type { User } from "~/types/api/user";

import Skeleton from "~/chakra/Skeleton";
import formatDate from "~/lib/formatDate";

import AddressEntity from "~/components/shared/AddressEntity";

import Medal from "./Medal";

import { getPercentOfUsersBelow } from "./utils";

type Props = {
  user: User;
  prevRank?: string;
  nextRank?: string;
  isLoading?: boolean;
  isSelf?: boolean;
};

export default function UsersTableItem({
  user,
  prevRank,
  nextRank,
  isLoading,
  isSelf,
}: Props) {
  const borderBottom =
    nextRank === user.rank ? "1px solid transparent" : undefined;

  const [integer, decimal] = user.total_balance.split(".");

  return (
    <Tr
      sx={{
        "> td": {
          verticalAlign: "middle",
          borderBottom,
          borderColor: isSelf ? "blue.100" : undefined,
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
        },
      }}
    >
      <Td>
        <Skeleton isLoaded={!isLoading} display="inline-block">
          {user.rank !== prevRank && (
            <Flex alignItems="center" gap={4}>
              <Text minW="10px" fontWeight={isSelf ? "600" : "500"}>
                {user.rank}
              </Text>
              <Medal rank={user.rank} />
            </Flex>
          )}
        </Skeleton>
      </Td>
      <Td>
        <Flex flexDirection="column" gap={2}>
          <AddressEntity
            address={user.address}
            isLoading={isLoading}
            hasLink
            fontWeight="600"
          />
          {isSelf && (
            <Flex alignItems="center" gap={2}>
              <Skeleton isLoaded={!isLoading}>
                <Tag colorScheme="blue">You</Tag>
              </Skeleton>
              <Skeleton isLoaded={!isLoading}>
                <Tag colorScheme="purple">
                  Rank higher than {getPercentOfUsersBelow(user.top_percent)}%
                  of users
                </Tag>
              </Skeleton>
            </Flex>
          )}
        </Flex>
      </Td>
      <Td>
        <Skeleton isLoaded={!isLoading} display="inline-block">
          <Text fontWeight={isSelf ? "600" : "500"}>
            {formatDate(user.registered_at)}
          </Text>
        </Skeleton>
      </Td>
      <Td isNumeric>
        <Skeleton isLoaded={!isLoading} display="inline-block">
          <Text fontWeight={isSelf ? "600" : "500"}>{user.referrals}</Text>
        </Skeleton>
      </Td>
      <Td isNumeric>
        <Skeleton isLoaded={!isLoading} display="inline-block">
          <Flex fontWeight={isSelf ? "600" : "500"}>
            <Text>{integer}</Text>
            {decimal && <Text variant="secondary">.{decimal}</Text>}
          </Flex>
        </Skeleton>
      </Td>
    </Tr>
  );
}
