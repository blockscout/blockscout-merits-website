import { useQuery } from "@tanstack/react-query";
import Airtable from "airtable";

import type { Campaign } from "~/types/campaign";

import config from "~/config/app";
import campaignsStub from "~/stubs/campaigns";

const airtable =
  config.airtable.apiKey && config.airtable.baseId
    ? new Airtable({ apiKey: config.airtable.apiKey }).base(
        config.airtable.baseId as string,
      )
    : null;

function sortCampaigns(array: Campaign[]): Campaign[] {
  const statusPriority: Record<Campaign["status"], number> = {
    upcoming: 0,
    active: 1,
    expired: 2,
  };

  return array.sort((a, b) => {
    const priorityA = statusPriority[a.status];
    const priorityB = statusPriority[b.status];

    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }

    if (a.status === "expired") {
      const endA = a.endDate ? new Date(a.endDate).getTime() : Infinity;
      const endB = b.endDate ? new Date(b.endDate).getTime() : Infinity;
      return endB - endA;
    } else {
      const startA = new Date(a.startDate).getTime();
      const startB = new Date(b.startDate).getTime();
      return startB - startA;
    }
  });
}

function getStatus(startDate: string, endDate?: string): string {
  const now = new Date();
  const start = new Date(startDate);

  if (now < start) {
    return "upcoming";
  }

  if (endDate) {
    const end = new Date(endDate);
    end.setDate(end.getDate() + 1);
    if (now >= end) {
      return "expired";
    }
  }

  return "active";
}

export default function useCampaignsQuery() {
  return useQuery({
    queryKey: ["campaigns"],
    queryFn: async () => {
      if (!airtable) {
        return [];
      }

      const data = await airtable("campaigns").select().all();

      const parsed = data.map(
        (record) =>
          ({
            ...record.fields,
            status: getStatus(
              record.fields.startDate as string,
              record.fields.endDate as string,
            ),
            tasks: JSON.parse(record.fields.tasks as string),
          }) as Campaign,
      );

      return sortCampaigns(parsed);
    },
    placeholderData: campaignsStub,
  });
}
