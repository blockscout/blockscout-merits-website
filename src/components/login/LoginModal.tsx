import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { useAppKitState } from "@reown/appkit/react";

import useIsMobile from "~/hooks/useIsMobile";

import CongratsStepContent from "./steps/CongratsStepContent";
import LoginStepContent from "./steps/LoginStepContent";

type Props = {
  onClose: () => void;
  onConfirm?: () => void;
};

const RewardsLoginModal = ({ onClose, onConfirm }: Props) => {
  const isMobile = useIsMobile();
  const { open: isWalletModalOpen } = useAppKitState();

  const [isLoginStep, setIsLoginStep] = useState(true);
  const [isReferral, setIsReferral] = useState(false);
  const [customReferralReward, setCustomReferralReward] = useState<
    string | null
  >(null);

  const goNext = useCallback((isReferral: boolean, reward: string | null) => {
    setIsReferral(isReferral);
    setCustomReferralReward(reward);
    setIsLoginStep(false);
  }, []);

  return (
    <Modal
      isOpen={!isWalletModalOpen}
      onClose={onClose}
      size={isMobile ? "full" : "sm"}
      isCentered
      autoFocus={false}
    >
      <ModalOverlay />
      <ModalContent width={isLoginStep ? "400px" : "560px"} p={6}>
        <ModalHeader fontWeight="500" textStyle="h3" mb={3}>
          {isLoginStep ? "Login" : "Congratulations"}
        </ModalHeader>
        <ModalCloseButton top={6} right={6} />
        <ModalBody mb={0}>
          {isLoginStep ? (
            <LoginStepContent
              goNext={goNext}
              closeModal={onConfirm || onClose}
            />
          ) : (
            <CongratsStepContent
              isReferral={isReferral}
              customReferralReward={customReferralReward}
              closeModal={onConfirm || onClose}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RewardsLoginModal;
