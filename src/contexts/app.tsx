"use client";

import { useQueryClient } from "@tanstack/react-query";
import React, {
  createContext,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useDisclosure } from "@chakra-ui/react";

import * as cookies from "~/lib/cookies";
import decodeJWT from "~/lib/decodeJWT";

type TAppContext = {
  isInitialized: boolean;
  apiToken: string | undefined;
  address: string | undefined;
  saveApiToken: (token: string | undefined) => void;
  loginModal: ReturnType<typeof useDisclosure>;
};

const initialState = {
  isInitialized: false,
  apiToken: undefined,
  address: undefined,
  saveApiToken: () => {},
  loginModal: {
    isOpen: false,
    onOpen: () => {},
    onClose: () => {},
  } as ReturnType<typeof useDisclosure>,
};

const AppContext = createContext<TAppContext>(initialState);

// Get the registered address from the JWT token
function getRegisteredAddress(token?: string): string | undefined {
  if (!token) {
    return undefined;
  }
  const decodedToken = decodeJWT(token);
  const address = decodedToken?.payload.sub;
  return typeof address === "string" ? address : undefined;
}

type Props = {
  children: React.ReactNode;
};

export function AppContextProvider({ children }: Props) {
  const queryClient = useQueryClient();

  const [isInitialized, setIsInitialized] = React.useState(false);
  const [apiToken, setApiToken] = React.useState<string | undefined>();
  const [address, setAddress] = React.useState<string | undefined>();
  const loginModal = useDisclosure();

  // Save the API token to cookies and state
  const saveApiToken = useCallback((token: string | undefined) => {
    if (token) {
      cookies.set(cookies.NAMES.API_TOKEN, token);
    } else {
      cookies.remove(cookies.NAMES.API_TOKEN);
    }
    setApiToken(token);
  }, []);

  // Initialize state with the API token from cookies
  useEffect(() => {
    const token = cookies.get(cookies.NAMES.API_TOKEN);
    if (token) {
      setApiToken(token);
    }
    setIsInitialized(true);
  }, []);

  // Get the registered address from the API token
  useEffect(() => {
    const address = getRegisteredAddress(apiToken);
    if (address) {
      setAddress(address);
    } else if (apiToken) {
      saveApiToken(undefined);
    }
  }, [apiToken, saveApiToken]);

  // Reset queries when the API token is removed
  useEffect(() => {
    if (!apiToken) {
      // queryClient.resetQueries({ queryKey: getResourceKey('rewards_user_balances'), exact: true });
      // queryClient.resetQueries({ queryKey: getResourceKey('rewards_user_daily_check'), exact: true });
      // queryClient.resetQueries({ queryKey: getResourceKey('rewards_user_referrals'), exact: true });
    }
  }, [apiToken, queryClient]);

  return (
    <AppContext.Provider
      value={{ isInitialized, apiToken, address, saveApiToken, loginModal }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
