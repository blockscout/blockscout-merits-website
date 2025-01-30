import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  Alert,
} from "@chakra-ui/react";
import React, { useCallback, useMemo } from "react";

import type { Offer } from "~/types/api/offer";

import TabsWithScroll from "~/components/shared/tabs/TabsWithScroll";

import useIsMobile from "~/hooks/useIsMobile";
import useRedeemOffer from "~/hooks/useRedeemOffer";
import useBalancesQuery from "~/hooks/useBalancesQuery";
import useOffersQuery from "~/hooks/useOffersQuery";
import { useAppContext } from "~/contexts/app";

import Description from "./detailsModal/tabs/Description";
import HowToUse from "./detailsModal/tabs/HowToUse";
import Redemptions from "./detailsModal/tabs/Redemptions";
import CongratsScreen from "./detailsModal/CongratsScreen";

type Props = {
  offer: Offer;
  onClose: () => void;
};

const OfferDetailsModal = ({ offer, onClose }: Props) => {
  const isMobile = useIsMobile();
  const balancesQuery = useBalancesQuery();
  const offersQuery = useOffersQuery();
  const redeemOffer = useRedeemOffer();
  const { address, loginModal } = useAppContext();
  const [isRedeeming, setIsRedeeming] = React.useState(false);
  const [isRedeemed, setIsRedeemed] = React.useState(false);
  const [promoCode, setPromoCode] = React.useState<string | undefined>();
  const [defaultTabIndex, setDefaultTabIndex] = React.useState<
    number | undefined
  >();

  const isInsufficientBalance = useMemo(
    () =>
      Boolean(address) &&
      Number(balancesQuery.data?.total || 0) < Number(offer.price),
    [balancesQuery, offer, address],
  );

  const handleClose = useCallback(() => {
    onClose();
    setIsRedeemed(false);
    setPromoCode(undefined);
  }, [onClose]);

  const handleOpenInstructions = useCallback(() => {
    setIsRedeemed(false);
    setPromoCode(undefined);
    setDefaultTabIndex(1);
  }, []);

  const handleRedeem = useCallback(async () => {
    setIsRedeeming(true);
    try {
      const { secret } = await redeemOffer(offer);
      setPromoCode(secret);
      setIsRedeemed(true);
      await Promise.all([balancesQuery.refetch(), offersQuery.refetch()]);
    } catch (error) {} // eslint-disable-line no-empty
    setIsRedeeming(false);
  }, [offer, redeemOffer, balancesQuery, offersQuery]);

  const alert = useMemo(
    () =>
      isInsufficientBalance ? (
        <Alert status="warning" mb={4} py={2} px={3} borderRadius="base">
          Insufficient balance of Merits
        </Alert>
      ) : null,
    [isInsufficientBalance],
  );

  const redeemButton = useMemo(
    () =>
      offer.is_valid ? (
        <Button
          onClick={address ? handleRedeem : loginModal.onOpen}
          isLoading={isRedeeming}
          isDisabled={isInsufficientBalance}
        >
          {address ? "Claim reward" : "Log in"}
        </Button>
      ) : null,
    [
      handleRedeem,
      isRedeeming,
      loginModal,
      address,
      isInsufficientBalance,
      offer.is_valid,
    ],
  );

  return (
    <Modal
      isOpen={!loginModal.isOpen}
      onClose={handleClose}
      size={isMobile ? "full" : "md"}
      isCentered
    >
      <ModalOverlay />
      <ModalContent width={isRedeemed ? "400px" : "560px"} p={6}>
        <ModalHeader fontWeight="500" textStyle="h3" mb={4}>
          {isRedeemed ? "Congratulations" : offer.details.title}
        </ModalHeader>
        <ModalCloseButton top={6} right={6} />
        <ModalBody mb={0}>
          {isRedeemed ? (
            <CongratsScreen
              offer={offer}
              promoCode={promoCode}
              onClose={handleClose}
              onOpenInstructions={handleOpenInstructions}
            />
          ) : (
            <TabsWithScroll
              defaultTabIndex={defaultTabIndex}
              tabs={[
                {
                  id: "description",
                  title: "Description",
                  component: (
                    <Description
                      offer={offer}
                      alert={alert}
                      redeemButton={redeemButton}
                    />
                  ),
                },
                {
                  id: "how to use",
                  title: "How to use",
                  component: (
                    <HowToUse
                      offer={offer}
                      alert={alert}
                      redeemButton={redeemButton}
                    />
                  ),
                },
                {
                  id: "redemptions",
                  title: "Redemptions",
                  component: <Redemptions offer={offer} />,
                },
              ].filter(Boolean)}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default OfferDetailsModal;
