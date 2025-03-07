import { Flex, Text, Button, Link } from "@chakra-ui/react";
import React from "react";

import MeritsIcon from "~/components/MeritsIcon";

type Props = {
  confirm: () => void;
  cancel: () => void;
  isLoading: boolean;
  price: string;
};

const ConfirmScreen = ({ confirm, cancel, isLoading, price }: Props) => {
  return (
    <Flex flexDir="column" alignItems="center" gap={6}>
      <Text>
        <MeritsIcon boxSize={5} mb={-1} mr={1} />
        {Number(price).toLocaleString("en-US")} Merits will be deducted from
        your balance to redeem a reward
      </Text>
      <Flex w="full" flexDir="column" alignItems="center" gap={3}>
        <Button w="full" onClick={confirm} isLoading={isLoading}>
          Confirm
        </Button>
        <Link fontWeight="600" onClick={cancel}>
          Cancel
        </Link>
      </Flex>
    </Flex>
  );
};

export default ConfirmScreen;
