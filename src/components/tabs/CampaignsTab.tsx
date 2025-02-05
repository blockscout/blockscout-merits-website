import { Grid } from "@chakra-ui/react";
import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import Skeleton from "~/chakra/Skeleton";
import useCampaignsQuery from "~/hooks/useCampaignsQuery";
import campaignsStub from "~/stubs/campaigns";

import CampaignCard from "~/components/campaigns/CampaignCard";
import CampaignDetails from "~/components/campaigns/CampaignDetails";

type Props = {
  scrollRef?: React.RefObject<HTMLDivElement>;
};

export default function BadgesTab({ scrollRef }: Props) {
  const campaignsQuery = useCampaignsQuery();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [campaignId, setCampaignId] = useState(() => searchParams.get("id"));

  useEffect(() => {
    const newId = searchParams.get("id");
    setCampaignId(newId);
  }, [searchParams]);

  const scrollToTop = useCallback(() => {
    if (scrollRef?.current) {
      const scrollPosition = window.scrollY;
      const elementPosition =
        scrollRef.current.getBoundingClientRect().top + scrollPosition;
      if (scrollPosition > elementPosition) {
        scrollRef.current.scrollIntoView(true);
      }
    }
  }, [scrollRef]);

  const handleSelect = useCallback(
    (id?: string, isReplace?: boolean) => {
      setCampaignId(id ?? null);

      const params = new URLSearchParams(searchParams.toString());
      if (id) {
        params.set("id", id);
      } else {
        params.delete("id");
      }
      router[isReplace ? "replace" : "push"](`${pathname}?${params}`, {
        scroll: false,
      });
      scrollToTop();
    },
    [searchParams, pathname, router, scrollToTop],
  );

  const handleClose = useCallback(() => handleSelect(), [handleSelect]);

  const selectedCampaign = useMemo(() => {
    if (!campaignId || campaignsQuery.isPlaceholderData) {
      return undefined;
    }
    const campaign = campaignsQuery.data?.find((c) => c.id === campaignId);
    if (!campaign) {
      handleSelect(undefined, true);
    }
    return campaign;
  }, [campaignId, campaignsQuery, handleSelect]);

  return campaignId ? (
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
