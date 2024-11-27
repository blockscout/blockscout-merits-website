import {
  Button,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useCallback } from "react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

import { useAppContext } from "~/contexts/app";

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
  const { saveApiToken } = useAppContext();
  const accountMenu = useDisclosure();

  const handleLogout = useCallback(() => {
    saveApiToken(undefined);
    accountMenu.onClose();
  }, [saveApiToken, accountMenu]);

  return (
    <Popover
      openDelay={300}
      placement="bottom-end"
      isLazy
      isOpen={accountMenu.isOpen}
      onClose={accountMenu.onClose}
    >
      <PopoverTrigger>
        <Button
          variant="header"
          size="sm"
          onClick={address ? accountMenu.onOpen : openModal}
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
      </PopoverTrigger>
      <PopoverContent w="230px">
        <PopoverBody display="flex" flexDir="column">
          <Text fontSize="sm" mb={2} textAlign="center">
            This address is used for the Merits program. Use it across all
            Blockscout explorers
          </Text>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Log out
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
