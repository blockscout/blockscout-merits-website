import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  useBoolean,
} from "@chakra-ui/react";
import React, { useCallback, useMemo } from "react";

import type { Offer } from "~/types/api/offer";

import TabsWithScroll from "~/components/shared/tabs/TabsWithScroll";

import useIsMobile from "~/hooks/useIsMobile";
import useRedeemOffer from "~/hooks/useRedeemOffer";
import useBalancesQuery from "~/hooks/useBalancesQuery";
import useOffersQuery from "~/hooks/useOffersQuery";
import useOfferRedemptionsQuery from "~/hooks/useOfferRedemptions";
import useCheckRedeemQuery from "~/hooks/useCheckRedeemQuery";
import { useAppContext } from "~/contexts/app";

import Description from "./detailsModal/tabs/Description";
import HowToUse from "./detailsModal/tabs/HowToUse";
import Redemptions from "./detailsModal/tabs/Redemptions";
import CongratsScreen from "./detailsModal/CongratsScreen";
import ConfirmScreen from "./detailsModal/ConfirmScreen";
import RedeemAlert from "./detailsModal/RedeemAlert";

type Props = {
  offer: Offer;
  onClose: () => void;
};

const OfferDetailsModal = ({ offer, onClose }: Props) => {
  const isMobile = useIsMobile();
  const { address, loginModal } = useAppContext();

  const balancesQuery = useBalancesQuery();
  const offersQuery = useOffersQuery();
  const redemptionsQuery = useOfferRedemptionsQuery(offer.offer_id);
  const checkRedeemQuery = useCheckRedeemQuery(offer);
  const redeemOffer = useRedeemOffer();

  const [isRedeeming, setIsRedeeming] = React.useState(false);
  const [isRedeemed, setIsRedeemed] = React.useState(false);
  const [promoCode, setPromoCode] = React.useState<string | undefined>();
  const [defaultTabIndex, setDefaultTabIndex] = React.useState<
    number | undefined
  >();
  const [showConfirmation, setShowConfirmation] = useBoolean(false);

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
      setShowConfirmation.off();
      await Promise.all([
        balancesQuery.refetch(),
        offersQuery.refetch(),
        redemptionsQuery.refetch(),
        checkRedeemQuery.refetch(),
      ]);
    } catch (error) {} // eslint-disable-line no-empty
    setIsRedeeming(false);
  }, [
    offer,
    redeemOffer,
    balancesQuery,
    offersQuery,
    redemptionsQuery,
    checkRedeemQuery,
    setShowConfirmation,
  ]);

  const redeemButton = useMemo(
    () =>
      offer.is_valid ? (
        <Button
          onClick={address ? setShowConfirmation.on : loginModal.onOpen}
          isLoading={isRedeeming || checkRedeemQuery.isLoading}
          isDisabled={
            checkRedeemQuery.data && !checkRedeemQuery.data?.is_redeemable
          }
        >
          {address ? "Redeem" : "Log in"}
        </Button>
      ) : null,
    [
      setShowConfirmation.on,
      isRedeeming,
      loginModal,
      address,
      offer.is_valid,
      checkRedeemQuery,
    ],
  );

  const alert = <RedeemAlert checkRedeemQuery={checkRedeemQuery} />;

  let content = null;
  let contentWidth = "400px";
  let title;

  if (isRedeemed) {
    title = "Congratulations";
    content = (
      <CongratsScreen
        offer={offer}
        promoCode={promoCode}
        onClose={handleClose}
        onOpenInstructions={handleOpenInstructions}
      />
    );
  } else if (showConfirmation) {
    title = "Are you sure?";
    content = (
      <ConfirmScreen
        confirm={handleRedeem}
        cancel={setShowConfirmation.off}
        isLoading={isRedeeming}
        price={offer.price}
      />
    );
  } else {
    contentWidth = "560px";
    title = offer.details.title;
    content = (
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
          address
            ? {
                id: "redemptions",
                title: "Redemptions",
                component: <Redemptions redemptionsQuery={redemptionsQuery} />,
              }
            : null,
        ].filter(Boolean)}
      />
    );
  }

  return (
    <Modal
      isOpen={!loginModal.isOpen}
      onClose={handleClose}
      size={isMobile ? "full" : "md"}
      isCentered
      autoFocus={false}
    >
      <ModalOverlay />
      <ModalContent width={contentWidth} p={6}>
        <ModalHeader fontWeight="500" textStyle="h3" mb={4} pr={12}>
          {title}
        </ModalHeader>
        <ModalCloseButton top={6} right={6} />
        <ModalBody mb={0}>{content}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default OfferDetailsModal;
