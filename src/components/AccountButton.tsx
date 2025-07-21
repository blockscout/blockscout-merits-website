import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Text,
  useDisclosure,
  Box,
  Divider,
  Link,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { useDisconnect } from "@reown/appkit/react";

import { useAppContext } from "~/contexts/app";
import * as mixpanel from "~/lib/mixpanel";

import AddressEntity from "~/components/shared/AddressEntity";
import SpriteIcon from "~/components/shared/SpriteIcon";

type Props = {
  isLoading?: boolean;
  address?: string;
  openLoginModal: () => void;
  openHistoryModal: () => void;
};

export default function AccountButton({
  isLoading,
  address,
  openLoginModal,
  openHistoryModal,
}: Props) {
  const { saveApiToken } = useAppContext();
  const accountMenu = useDisclosure();
  const { disconnect } = useDisconnect();

  const handleLogout = useCallback(() => {
    mixpanel.logEvent(mixpanel.EventTypes.WALLET, { Action: "Logout" });
    saveApiToken(undefined);
    accountMenu.onClose();
    disconnect();
  }, [saveApiToken, accountMenu, disconnect]);

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
          onClick={address ? accountMenu.onOpen : openLoginModal}
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
      <PopoverContent w="280px">
        <PopoverBody display="flex" flexDir="column">
          <Box p={3} borderRadius="base" bgColor="blackAlpha.50">
            <Text fontSize="xs" fontWeight="500" lineHeight="1.33">
              This address is used for the Merits program. Use it across all
              Blockscout explorers
            </Text>
          </Box>
          <Link
            variant="menu"
            display="flex"
            alignItems="center"
            gap={3}
            onClick={openHistoryModal}
            py="14px"
            fontSize="sm"
            fontWeight="500"
            color="blackAlpha.800"
            _hover={{
              color: "blue.400",
              textDecoration: "none",
            }}
          >
            <SpriteIcon name="clock-2" boxSize={5} />
            Merits history
          </Link>
          <Divider mb={4} />
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Log out
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
