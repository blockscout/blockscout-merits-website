import { Grid } from "@chakra-ui/react";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import type { Offer } from "~/types/api/offer";

import Skeleton from "~/chakra/Skeleton";
import useOffersQuery from "~/hooks/useOffersQuery";

import OfferCard from "~/components/offers/OfferCard";
import OfferDetailsModal from "~/components/offers/OfferDetailsModal";

export default function OffersTab() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const offersQuery = useOffersQuery();

  const [offerId, setOfferId] = useState(() => searchParams.get("id"));

  useEffect(() => {
    const newId = searchParams.get("id");
    setOfferId(newId);
  }, [searchParams]);

  const handleSelect = useCallback(
    (id?: Offer["offer_id"]) => {
      setOfferId(id ?? null);

      const params = new URLSearchParams(searchParams.toString());
      if (id) {
        params.set("id", id);
      } else {
        params.delete("id");
      }
      router.replace(`${pathname}?${params}`, { scroll: false });
    },
    [searchParams, pathname, router],
  );

  const handleClose = useCallback(() => handleSelect(), [handleSelect]);

  const selectedOffer = useMemo(() => {
    if (!offerId || offersQuery.isPlaceholderData) {
      return undefined;
    }
    const offer = offersQuery.data?.find((offer) => offer.offer_id === offerId);
    if (!offer) {
      handleSelect();
    }
    return offer;
  }, [offerId, offersQuery, handleSelect]);

  return (
    <>
      <Grid
        gap={6}
        templateColumns="repeat(auto-fill, minmax(260px, 1fr))"
        autoRows="1fr"
      >
        {offersQuery.data?.map((offer, index) => (
          <Skeleton key={index} isLoaded={!offersQuery.isPlaceholderData}>
            <OfferCard {...offer} onClick={handleSelect} />
          </Skeleton>
        ))}
      </Grid>

      {selectedOffer && (
        <OfferDetailsModal offer={selectedOffer} onClose={handleClose} />
      )}
    </>
  );
}
