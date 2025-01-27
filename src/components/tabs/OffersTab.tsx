import { Grid } from "@chakra-ui/react";
import React from "react";

import Skeleton from "~/chakra/Skeleton";
import useOffersQuery from "~/hooks/useOffersQuery";

import OfferCard from "~/components/offers/OfferCard";

export default function OffersTab() {
  const offersQuery = useOffersQuery();

  return (
    <Grid
      gap={6}
      templateColumns="repeat(auto-fill, minmax(260px, 1fr))"
      autoRows="1fr"
    >
      {offersQuery.data?.map((offer, index) => (
        <Skeleton key={index} isLoaded={!offersQuery.isPlaceholderData}>
          <OfferCard {...offer} onClick={() => {}} />
        </Skeleton>
      ))}
    </Grid>
  );
}
