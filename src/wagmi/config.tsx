import { cookieStorage, createStorage } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import type { AppKitNetwork } from "@reown/appkit/networks";
import * as allNetworks from "@reown/appkit/networks";

import config from "~/config/app";

export const projectId = config.reown.projectId;

export const networks = Object.values(allNetworks) as Array<AppKitNetwork> as [
  AppKitNetwork,
  ...AppKitNetwork[],
];

if (!projectId) {
  throw new Error("Project ID is not defined");
}

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});
