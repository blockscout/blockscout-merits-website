import { Tr, Td, Link, Flex, Text, Image, Tag } from "@chakra-ui/react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

import type { User } from "~/types/api/user";

import Skeleton from "~/chakra/Skeleton";
import formatDate from "~/lib/formatDate";
import MeritsIcon from "../MeritsIcon";

const medals = ["gold", "silver", "bronze"] as const;

type Props = {
  user: User;
  isLoading?: boolean;
  isSelf?: boolean;
};

function getPercentOfUsersBelow(topPercent: User["top_percent"]) {
  let percent = 100 - topPercent;
  if (percent < 99) {
    percent = Math.floor(percent);
  }
  return percent;
}

export default function UsersTableItem({ user, isLoading, isSelf }: Props) {
  return (
    <Tr
      sx={{
        "> td": {
          verticalAlign: "middle",
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
          <Flex alignItems="center" gap={4}>
            <Text minW="10px" fontWeight={isSelf ? "600" : "500"}>
              {user.rank}
            </Text>
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
          <Flex flexDirection="column" gap={2}>
            <Flex alignItems="center" gap={1.5}>
              <Jazzicon diameter={16} seed={jsNumberForAddress(user.address)} />
              <Link
                href={`https://eth.blockscout.com/address/${user.address}`}
                isExternal
                fontWeight={isSelf ? "600" : "500"}
              >
                {user.address}
              </Link>
            </Flex>
            {isSelf && (
              <Flex alignItems="center" gap={2}>
                <Tag colorScheme="blue">You</Tag>
                <Tag colorScheme="purple">
                  Rank higher than {getPercentOfUsersBelow(user.top_percent)}%
                  of users
                </Tag>
              </Flex>
            )}
          </Flex>
        </Skeleton>
      </Td>
      <Td isNumeric>
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
          <Flex alignItems="center" gap={2}>
            <MeritsIcon boxSize={5} noShadow />
            <Text fontWeight={isSelf ? "600" : "500"}>
              {user.total_balance}
            </Text>
          </Flex>
        </Skeleton>
      </Td>
    </Tr>
  );
}
