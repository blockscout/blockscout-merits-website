import type { User } from "~/types/api/user";

export function getPercentOfUsersBelow(topPercent: User["top_percent"]) {
  let percent = 100 - topPercent;
  if (percent < 99) {
    percent = Math.floor(percent);
  }
  return percent;
}
