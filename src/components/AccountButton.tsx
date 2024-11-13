import { Button, Flex } from "@chakra-ui/react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

type Props = {
  isLoading?: boolean;
  address?: string;
  openModal: () => void;
};

export default function AccountButton({
  isLoading,
  address,
  openModal,
}: Props) {
  return (
    <Button
      variant="header"
      size="sm"
      onClick={address ? undefined : openModal}
      data-selected={Boolean(address)}
      isLoading={isLoading}
      loadingText="Loading..."
    >
      {address ? (
        <Flex alignItems="center" gap={1.5}>
          <Jazzicon diameter={16} seed={jsNumberForAddress(address)} />
          {address.slice(0, 4)}...{address.slice(-4)}
        </Flex>
      ) : (
        "Log in"
      )}
    </Button>
  );
}
