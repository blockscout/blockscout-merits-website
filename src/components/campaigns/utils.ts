import type { Campaign } from "~/types/campaign";

export function getBgColor(
  rewardType: Campaign["rewardType"],
  rewardValue: string,
  endDate: string | undefined,
) {
  if (endDate && new Date() > new Date(endDate)) {
    return "rgba(16, 17, 18, 0.06)";
  }

  if (rewardType === "merits") {
    return "#DFE8F5";
  }

  if (rewardType === "badge") {
    return rewardValue === "epic" ? "#FCE4AF" : "#EFE1FF";
  }
}
