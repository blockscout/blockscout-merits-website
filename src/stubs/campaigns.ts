import type { Campaign } from "~/types/campaign";

export default Array.from({ length: 4 }, (_, i) => ({
  title: `Campaign ${i}`,
  description: `Campaign ${i} description`,
  rewardType: "merits",
  rewardValue: "100",
  imageUrl: "https://example.com",
  startDate: "2022-01-01",
  endDate: "2022-12-31",
  checkTime: "Every 24 hours",
  tasks: [
    {
      title: "Task 1",
      description: "Task 1 description",
      buttonText: "Complete",
      buttonLink: "https://example.com",
    },
  ],
})) as Campaign[];
