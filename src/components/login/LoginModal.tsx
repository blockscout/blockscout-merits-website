import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useBoolean,
} from "@chakra-ui/react";
import React, { useCallback } from "react";
import { useAppKitState } from "@reown/appkit/react";

import useIsMobile from "~/hooks/useIsMobile";

import CongratsStepContent from "./steps/CongratsStepContent";
import LoginStepContent from "./steps/LoginStepContent";

type Props = {
  onClose: () => void;
};

const RewardsLoginModal = ({ onClose }: Props) => {
  const isMobile = useIsMobile();
  const { open: isWalletModalOpen } = useAppKitState();

  const [isLoginStep, setIsLoginStep] = useBoolean(true);
  const [isReferral, setIsReferral] = useBoolean(false);

  const goNext = useCallback(
    (isReferral: boolean) => {
      if (isReferral) {
        setIsReferral.on();
      }
      setIsLoginStep.off();
    },
    [setIsLoginStep, setIsReferral],
  );

  return (
    <Modal
      isOpen={!isWalletModalOpen}
      onClose={onClose}
      size={isMobile ? "full" : "sm"}
      isCentered
    >
      <ModalOverlay />
      <ModalContent width={isLoginStep ? "400px" : "560px"} p={6}>
        <ModalHeader fontWeight="500" textStyle="h3" mb={3}>
          {isLoginStep ? "Login" : "Congratulations"}
        </ModalHeader>
        <ModalCloseButton top={6} right={6} />
        <ModalBody mb={0}>
          {isLoginStep ? (
            <LoginStepContent goNext={goNext} closeModal={onClose} />
          ) : (
            <CongratsStepContent isReferral={isReferral} closeModal={onClose} />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RewardsLoginModal;
