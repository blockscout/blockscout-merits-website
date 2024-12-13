import { Flex, Link, Text } from "@chakra-ui/react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

import Skeleton from "~/chakra/Skeleton";

type Props = {
  address: string;
  isLoading?: boolean;
  isShort?: boolean;
  hasLink?: boolean;
  fontWeight?: string;
};

export default function AddressEntity({
  address,
  isLoading,
  isShort,
  hasLink,
  fontWeight,
}: Props) {
  const displayedAddress = isShort
    ? `${address.slice(0, 4)}...${address.slice(-4)}`
    : address;

  const addressContent = hasLink ? (
    <Link
      href={`https://eth.blockscout.com/address/${address}?utm_source=merits-website&utm_medium=dashboard`}
      isExternal
    >
      {displayedAddress}
    </Link>
  ) : (
    <Text>{displayedAddress}</Text>
  );

  return (
    <Skeleton
      isLoaded={!isLoading}
      as={Flex}
      alignItems="center"
      w="fit-content"
      gap={1.5}
      fontWeight={fontWeight}
    >
      <Jazzicon diameter={16} seed={jsNumberForAddress(address)} />
      {addressContent}
    </Skeleton>
  );
}
