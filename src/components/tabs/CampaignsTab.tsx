import { Grid } from "@chakra-ui/react";
import { useState, useCallback, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import type { Campaign } from "~/types/campaign";

import Skeleton from "~/chakra/Skeleton";
import useCampaignsQuery from "~/hooks/useCampaignsQuery";
import campaignsStub from "~/stubs/campaigns";

import CampaignCard from "~/components/campaigns/CampaignCard";
import CampaignDetails from "~/components/campaigns/CampaignDetails";

export default function BadgesTab() {
  const campaignsQuery = useCampaignsQuery();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [selectedCampaign, setSelectedCampaign] = useState<
    Campaign | undefined
  >();

  const handleSelect = useCallback(
    (id?: string, isReplace?: boolean) => {
      const params = new URLSearchParams(searchParams.toString());
      if (id) {
        params.set("id", id);
      } else {
        params.delete("id");
      }
      router[isReplace ? "replace" : "push"](`${pathname}?${params}`);
    },
    [searchParams, pathname, router],
  );

  const handleClose = useCallback(() => handleSelect(), [handleSelect]);

  useEffect(() => {
    if (campaignsQuery.isPlaceholderData) return;

    const id = searchParams.get("id");
    const campaign = id
      ? campaignsQuery.data?.find((c) => c.id === id)
      : undefined;
    setSelectedCampaign(campaign);

    if (id && !campaign) {
      handleSelect(undefined, true);
    }
  }, [campaignsQuery, searchParams, handleSelect]);

  return searchParams.get("id") ? (
    <CampaignDetails
      {...(selectedCampaign || campaignsStub[0])}
      isLoading={!selectedCampaign}
      onClose={handleClose}
    />
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
