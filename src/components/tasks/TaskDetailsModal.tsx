import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import React from "react";

import useIsMobile from "~/hooks/useIsMobile";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export default function ExplorersModal({
  isOpen,
  onClose,
  title,
  children,
}: Props) {
  const isMobile = useIsMobile();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={isMobile ? "full" : "md"}
      isCentered
      autoFocus={false}
    >
      <ModalOverlay />
      <ModalContent width="400px" p={6}>
        <ModalHeader fontWeight="500" textStyle="h3" mb={4} pr={12}>
          {title}
        </ModalHeader>
        <ModalCloseButton top={6} right={6} />
        <ModalBody mb={0}>
          <Flex flexDir="column" gap={3}>
            <Text>{children}</Text>
            <Text fontSize="sm" color="secondary">
              Note: Merits are only earned on supported networks where the
              program is active.
            </Text>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
