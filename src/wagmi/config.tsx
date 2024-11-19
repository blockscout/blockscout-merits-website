import { cookieStorage, createStorage } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { mainnet } from "@reown/appkit/networks";

export const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID;

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
  networks: [mainnet],
});

export const config = wagmiAdapter.wagmiConfig;
