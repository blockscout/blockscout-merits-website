import type { Campaign } from "~/types/campaign";

export default Array.from({ length: 4 }, (_, i) => ({
  id: `campaign-${i}`,
  title: `Campaign ${i}`,
  description:
    "Embark on an exciting quest to unlock an exclusive Badge and reap extraordinary rewards! The path is simple: by completing a swap of just $3,000, you become eligible to participate in this thrilling journey. Once you successfully meet this requirement, you'll be rewarded with valuable Merits, your gateway to a world of special perks.",
  rewardType: "merits",
  rewardValue: "100",
  imageUrl: "https://example.com",
  status: "expired",
  startDate: "2022-01-01",
  endDate: "2022-12-31",
  checkTime: "Every 24 hours",
  tasks: [
    {
      title: "Login to twitter",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do.",
      buttonText: "Login",
      buttonLink: "https://example.com",
    },
    {
      title: "Follow @blockscoutcom on twitter",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do.",
      buttonText: "Follow",
      buttonLink: "https://example.com",
    },
    {
      title: "Like tweet",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do.",
      buttonText: "Like",
      buttonLink: "https://example.com",
    },
    {
      title: "Retweet tweet",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do.",
      buttonText: "Retweet",
      buttonLink: "https://example.com",
    },
  ],
})) as Campaign[];
