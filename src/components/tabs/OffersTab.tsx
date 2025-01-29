import { Grid } from "@chakra-ui/react";
import React, { useCallback } from "react";

import type { Offer } from "~/types/api/offer";

import Skeleton from "~/chakra/Skeleton";
import useOffersQuery from "~/hooks/useOffersQuery";

import OfferCard from "~/components/offers/OfferCard";
import OfferDetailsModal from "~/components/offers/OfferDetailsModal";

export default function OffersTab() {
  const offersQuery = useOffersQuery();
  const [selectedOffer, setSelectedOffer] = React.useState<Offer | undefined>();

  const handleSelect = useCallback(
    (id: Offer["offer_id"]) => {
      const offer = offersQuery.data?.items.find(
        (offer) => offer.offer_id === id,
      );
      setSelectedOffer(offer);
    },
    [offersQuery.data],
  );

  const handleReset = useCallback(() => {
    setSelectedOffer(undefined);
  }, []);

  return (
    <>
      <Grid
        gap={6}
        templateColumns="repeat(auto-fill, minmax(260px, 1fr))"
        autoRows="1fr"
      >
        {offersQuery.data?.items.map((offer, index) => (
          <Skeleton key={index} isLoaded={!offersQuery.isPlaceholderData}>
            <OfferCard {...offer} onClick={handleSelect} />
          </Skeleton>
        ))}
      </Grid>
      {selectedOffer && (
        <OfferDetailsModal offer={selectedOffer} onClose={handleReset} />
      )}
    </>
  );
}
