import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import React, { useCallback } from "react";
import { useAppKitState } from "@reown/appkit/react";

import type { Offer } from "~/types/api/offer";

import TabsWithScroll from "~/components/shared/tabs/TabsWithScroll";

import useIsMobile from "~/hooks/useIsMobile";
import useRedeemOffer from "~/hooks/useRedeemOffer";
import useBalancesQuery from "~/hooks/useBalancesQuery";
import useOffersQuery from "~/hooks/useOffersQuery";

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
  const balancesQuery = useBalancesQuery();
  const offersQuery = useOffersQuery();
  const redeemOffer = useRedeemOffer();
  const [isRedeeming, setIsRedeeming] = React.useState(false);

  const handleRedeem = useCallback(
    async (offer: Offer) => {
      setIsRedeeming(true);
      try {
        await redeemOffer(offer);
        await Promise.all([balancesQuery.refetch(), offersQuery.refetch()]);
      } catch (error) {} // eslint-disable-line no-empty
      setIsRedeeming(false);
    },
    [redeemOffer, balancesQuery, offersQuery],
  );

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
          {offer.details.title}
        </ModalHeader>
        <ModalCloseButton top={6} right={6} />
        <ModalBody mb={0}>
          <TabsWithScroll
            tabs={[
              {
                id: "description",
                title: "Description",
                component: (
                  <Description
                    offer={offer}
                    redeem={handleRedeem}
                    isRedeeming={isRedeeming}
                  />
                ),
              },
              {
                id: "how to use",
                title: "How to use",
                component: (
                  <HowToUse
                    offer={offer}
                    redeem={handleRedeem}
                    isRedeeming={isRedeeming}
                  />
                ),
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
