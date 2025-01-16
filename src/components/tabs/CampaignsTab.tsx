import { Grid } from "@chakra-ui/react";
import { useState, useCallback } from "react";

import type { Campaign } from "~/types/campaign";

import Skeleton from "~/chakra/Skeleton";
import useCampaignsQuery from "~/hooks/useCampaignsQuery";

import CampaignCard from "~/components/campaigns/CampaignCard";
import CampaignDetails from "~/components/campaigns/CampaignDetails";

export default function BadgesTab() {
  const campaignsQuery = useCampaignsQuery();

  const [selected, setSelected] = useState<Campaign | null>(null);

  const handleSelect = useCallback(
    (id: string) => {
      const campaign = campaignsQuery.data?.find((c) => c.id === id);
      if (campaign) setSelected(campaign);
    },
    [campaignsQuery.data],
  );

  const handleClose = useCallback(() => setSelected(null), []);

  return selected !== null ? (
    <CampaignDetails {...selected} onClose={handleClose} />
  ) : (
    <Grid
      gap={6}
      templateColumns="repeat(auto-fill, minmax(260px, 1fr))"
      autoRows="1fr"
    >
      {campaignsQuery.data?.map((campaign, index) => (
        <Skeleton key={index} isLoaded={!campaignsQuery.isPlaceholderData}>
          <CampaignCard {...campaign} onClick={handleSelect} />
        </Skeleton>
      ))}
    </Grid>
  );
}
