import type { Offer } from "~/types/api/offer";

export function getBgColor(
  type: Offer["details"]["type"],
  isExpired?: boolean,
) {
  const colors = {
    booster: "linear-gradient(126deg, #FCC0FF 10%, #FFD5B3 90%)",
    badge: "#EFE1FF",
    discount: "linear-gradient(126deg, #ACEEBD 10%, #E3F0B6 90%)",
    access: "linear-gradient(126deg, #E0B9FE 10%, #CDE8FF 80%)",
  };

  return isExpired ? "rgba(16, 17, 18, 0.06)" : colors[type];
}
