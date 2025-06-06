import { useCallback } from "react";
import { useAccount, useSignMessage } from "wagmi";

import { useAppContext } from "~/contexts/app";

import getErrorObjPayload from "~/lib/errors/getErrorObjPayload";
import getErrorMessage from "~/lib/errors/getErrorMessage";
import { YEAR } from "~/lib/consts";
import config, { getApiUrl } from "~/config/app";

import useCheckUserQuery from "./useCheckUserQuery";
import useToast from "./useToast";

function getMessageToSign(
  address: string,
  nonce: string,
  isLogin?: boolean,
  refCode?: string,
) {
  const signInText = "Sign-In for the Blockscout Merits program.";
  const signUpText =
    "Sign-Up for the Blockscout Merits program. I accept Terms of Service: https://merits.blockscout.com/terms. I love capybaras.";
  const referralText = refCode ? ` Referral code: ${refCode}` : "";
  const body = isLogin ? signInText : signUpText + referralText;

  const urlObj =
    window.location.hostname === "localhost"
      ? new URL(config.api.origin || "")
      : window.location;

  return [
    `${urlObj.hostname} wants you to sign in with your Ethereum account:`,
    address,
    "",
    body,
    "",
    `URI: ${urlObj.origin}`,
    "Version: 1",
    "Chain ID: 1",
    `Nonce: ${nonce}`,
    `Issued At: ${new Date().toISOString()}`,
    `Expiration Time: ${new Date(Date.now() + YEAR).toISOString()}`,
  ].join("\n");
}

export default function useLogin() {
  const { address } = useAccount();
  const checkUserQuery = useCheckUserQuery();
  const { signMessageAsync } = useSignMessage();
  const toast = useToast();
  const { saveApiToken } = useAppContext();

  return useCallback(
    async (refCode: string) => {
      try {
        if (!address) {
          throw new Error();
        }
        const [nonceResponse, checkCodeResponse] = await Promise.all([
          fetch(getApiUrl("/auth/nonce")).then((response) =>
            response.json(),
          ) as Promise<{ nonce: string }>,
          refCode
            ? (fetch(getApiUrl(`/auth/code/${refCode}`)).then((response) =>
                response.json(),
              ) as Promise<{
                valid: boolean;
                reward: string | null;
              }>)
            : Promise.resolve({ valid: true, reward: null }),
        ]);
        if (!checkCodeResponse.valid) {
          return { invalidRefCodeError: true };
        }
        const message = getMessageToSign(
          address,
          nonceResponse.nonce,
          checkUserQuery.data?.exists,
          refCode,
        );
        const signature = await signMessageAsync({ message });
        const loginResponse = await (fetch(getApiUrl("/auth/login"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nonce: nonceResponse.nonce,
            message,
            signature,
          }),
        }).then((response) => response.json()) as Promise<{
          token: string;
          created: boolean;
        }>);
        saveApiToken(loginResponse.token);
        return {
          isNewUser: loginResponse.created,
          reward: checkCodeResponse.reward,
        };
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
    [address, signMessageAsync, saveApiToken, checkUserQuery, toast],
  );
}
