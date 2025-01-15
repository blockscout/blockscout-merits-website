export interface Campaign {
  title: string;
  description: string;
  rewardType: "merits" | "badge";
  rewardValue: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  checkTime: string;
  tasks: [
    {
      title: string;
      description: string;
      buttonText?: string;
      buttonLink?: string;
    },
  ];
}
