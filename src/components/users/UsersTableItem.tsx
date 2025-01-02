import { Tr, Td, Flex, Text, Tag } from "@chakra-ui/react";

import type { User } from "~/types/api/user";

import Skeleton from "~/chakra/Skeleton";
import formatDate from "~/lib/formatDate";

import AddressEntity from "~/components/shared/AddressEntity";

import Medal from "./Medal";

import { getPercentOfUsersBelow } from "./utils";

type Props = {
  user: User;
  indexInGroup?: number;
  groupSize?: number;
  prevRank?: string;
  nextRank?: string;
  isLoading?: boolean;
  isSelf?: boolean;
};

export default function UsersTableItem({
  user,
  indexInGroup = 0,
  groupSize = 1,
  isLoading,
  isSelf,
}: Props) {
  const [integer, decimal] = user.total_balance.split(".");

  return (
    <Tr
      sx={{
        "> td": {
          verticalAlign: "middle",
          borderBottom:
            indexInGroup < groupSize - 1 ? "1px solid transparent" : undefined,
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
          },
        },
      }}
    >
      {indexInGroup === 0 && (
        <Td rowSpan={groupSize} alignContent="start">
          <Skeleton
            isLoaded={!isLoading}
            display="inline-block"
            position={groupSize > 1 ? "sticky" : undefined}
            top={groupSize > 1 ? 136 : undefined} // 80px pagination + 40px thead + 16px padding
          >
            <Flex alignItems="center" gap={4}>
              <Text minW="10px" fontWeight={isSelf ? "600" : "500"}>
                {user.rank}
              </Text>
              <Medal rank={user.rank} />
            </Flex>
          </Skeleton>
        </Td>
      )}
      <Td _first={{ paddingLeft: 1.5 }}>
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
