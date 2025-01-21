export interface Campaign {
  id: string;
  title: string;
  description: string;
  rewardType: "merits" | "badge";
  rewardValue: string;
  imageUrl: string;
  status: "upcoming" | "active" | "expired";
  startDate: string;
  endDate?: string;
  checkTime: string;
  tasks: {
    title: string;
    description: string;
    buttonText?: string;
    buttonLink?: string;
  }[];
}
