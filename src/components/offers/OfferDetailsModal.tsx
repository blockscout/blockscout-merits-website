import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import React from "react";
import { useAppKitState } from "@reown/appkit/react";

import type { Offer } from "~/types/api/offer";

import TabsWithScroll from "~/components/shared/tabs/TabsWithScroll";

import useIsMobile from "~/hooks/useIsMobile";

import Description from "./modalTabs/Description";
import HowToUse from "./modalTabs/HowToUse";
import Redemptions from "./modalTabs/Redemptions";

type Props = {
  offer: Offer;
  onClose: () => void;
};

const OfferDetailsModal = ({ offer, onClose }: Props) => {
  const isMobile = useIsMobile();
  const { open: isWalletModalOpen } = useAppKitState();

  return (
    <Modal
      isOpen={!isWalletModalOpen}
      onClose={onClose}
      size={isMobile ? "full" : "md"}
      isCentered
    >
      <ModalOverlay />
      <ModalContent width="560px" p={6}>
        <ModalHeader fontWeight="500" textStyle="h3" mb={3}>
          {offer.details.name}
        </ModalHeader>
        <ModalCloseButton top={6} right={6} />
        <ModalBody mb={0}>
          <TabsWithScroll
            tabs={[
              {
                id: "description",
                title: "Description",
                component: <Description offer={offer} />,
              },
              {
                id: "how to use",
                title: "How to use",
                component: <HowToUse offer={offer} />,
              },
              {
                id: "redemptions",
                title: "Redemptions",
                component: <Redemptions />,
              },
            ].filter(Boolean)}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default OfferDetailsModal;
