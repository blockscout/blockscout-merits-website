import { useQuery } from "@tanstack/react-query";
import Airtable from "airtable";

import type { Campaign } from "~/types/campaign";

import config from "~/config/app";
import campaignsStub from "~/stubs/campaigns";

const airtable = new Airtable({ apiKey: config.airtable.apiKey }).base(
  config.airtable.baseId as string,
);

function sortCampaigns(array: Campaign[]): Campaign[] {
  const currentDate = new Date();

  return array.sort((a, b) => {
    const startA = new Date(a.startDate);
    const endA = a.endDate ? new Date(a.endDate) : undefined;

    const startB = new Date(b.startDate);
    const endB = b.endDate ? new Date(b.endDate) : undefined;

    const getStatus = (start: Date, end?: Date): number => {
      if (currentDate < start) return 0; // Upcoming
      if (end && currentDate > end) return 2; // Expired
      return 1; // Active
    };

    const statusA = getStatus(startA, endA);
    const statusB = getStatus(startB, endB);

    if (statusA !== statusB) {
      return statusA - statusB;
    }
    return startA.getTime() - startB.getTime();
  });
}

export default function useCampaignsQuery() {
  return useQuery({
    queryKey: ["campaigns"],
    queryFn: async () => {
      const data = await airtable("campaigns").select().all();

      const parsed = data.map(
        (record) =>
          ({
            ...record.fields,
            tasks: JSON.parse(record.fields.tasks as string),
          }) as Campaign,
      );

      return sortCampaigns(parsed);
    },
    placeholderData: campaignsStub,
  });
}
