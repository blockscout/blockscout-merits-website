import { Grid } from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";
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
  const [selectedOffer, setSelectedOffer] = React.useState<Offer | undefined>();

  const handleSelect = useCallback(
    (id?: Offer["offer_id"]) => {
      const params = new URLSearchParams(searchParams.toString());
      if (id) {
        params.set("id", id);
      } else {
        params.delete("id");
      }
      router.replace(`${pathname}?${params}`);
    },
    [searchParams, pathname, router],
  );

  useEffect(() => {
    const id = searchParams.get("id");
    const offer =
      id && !offersQuery.isPlaceholderData
        ? offersQuery.data?.find((offer) => offer.offer_id === id)
        : undefined;
    setSelectedOffer(offer);
  }, [searchParams, offersQuery]);

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
        <OfferDetailsModal offer={selectedOffer} onClose={handleSelect} />
      )}
    </>
  );
}
