import { Grid } from "@chakra-ui/react";

import Skeleton from "~/chakra/Skeleton";
import useCampaignsQuery from "~/hooks/useCampaignsQuery";

import CampaignCard from "~/components/campaigns/CampaignCard";

export default function BadgesTab() {
  const campaignsQuery = useCampaignsQuery();

  return (
    <Grid
      gap={6}
      templateColumns="repeat(auto-fill, minmax(260px, 1fr))"
      autoRows="1fr"
    >
      {campaignsQuery.data?.map((campaign, index) => (
        <Skeleton key={index} isLoaded={!campaignsQuery.isPlaceholderData}>
          <CampaignCard {...campaign} />
        </Skeleton>
      ))}
    </Grid>
  );
}
