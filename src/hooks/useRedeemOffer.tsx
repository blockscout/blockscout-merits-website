import { useCallback } from "react";

import type { Offer } from "~/types/api/offer";

import { useAppContext } from "~/contexts/app";
import { getApiUrl } from "~/config/app";
import getErrorObjPayload from "~/lib/errors/getErrorObjPayload";
import getErrorMessage from "~/lib/errors/getErrorMessage";

import useToast from "./useToast";

export default function useRedeemOffer() {
  const { apiToken } = useAppContext();
  const toast = useToast();

  return useCallback(
    async (offer: Offer) => {
      try {
        const response = await fetch(getApiUrl("/user/offers/redeem"), {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            offer_id: offer.offer_id,
            expected_price: offer.price,
            note: "",
          }),
        });

        if (!response.ok) {
          const errorBody = await response.json();
          throw errorBody;
        }

        return (await response.json()) as { secret?: string };
      } catch (_error) {
        const apiError = getErrorObjPayload<{ message: string }>(_error);
        toast({
          position: "top-right",
          title: "Error",
          description:
            apiError?.message ||
            getErrorMessage(_error) ||
            "Something went wrong. Try again later.",
          status: "error",
          variant: "subtle",
          isClosable: true,
        });
        throw _error;
      }
    },
    [apiToken, toast],
  );
}
