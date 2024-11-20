import { useCallback } from "react";

import getErrorObjPayload from "~/lib/errors/getErrorObjPayload";
import getErrorMessage from "~/lib/errors/getErrorMessage";
import { useAppContext } from "~/contexts/app";
import { getApiUrl } from "~/config/app";

import useToast from "./useToast";

export default function useClaim() {
  const toast = useToast();
  const { apiToken } = useAppContext();

  return useCallback(async () => {
    try {
      await fetch(getApiUrl("/user/daily/claim"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiToken}`,
        },
      });
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
  }, [toast, apiToken]);
}
