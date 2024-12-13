import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useCallback } from "react";

import { useAppContext } from "~/contexts/app";

import AddressEntity from "~/components/shared/AddressEntity";

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
          fontWeight="700"
          onClick={address ? accountMenu.onOpen : openModal}
          data-selected={Boolean(address)}
          isLoading={isLoading}
          loadingText="Loading..."
        >
          {address ? (
            <AddressEntity address={address} isShort fontWeight="700" />
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
