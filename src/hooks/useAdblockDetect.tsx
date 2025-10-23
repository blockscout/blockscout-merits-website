import { useEffect, useState } from "react";

import * as cookies from "~/lib/cookies";
import isBrowser from "~/lib/isBrowser";
import config from "~/config/app";

const DEFAULT_URL = "https://request-global.czilladx.com";

// in general, detect should work with any ad-provider url (that is alive)
// but we see some false-positive results in certain browsers
const TEST_URLS: Record<string, string> = {
  slise: "https://v1.slise.xyz/serve",
  coinzilla: "https://request-global.czilladx.com",
  adbutler: "https://servedbyadbutler.com/app.js",
  none: DEFAULT_URL,
};

export default function useAdblockDetect(provider = "slise") {
  const adblockCookie = cookies.get(cookies.NAMES.ADBLOCK_DETECTED);
  const [isAdblockDetected, setIsAdblockDetected] = useState(
    adblockCookie === "true",
  );

  useEffect(() => {
    if (isBrowser() && !adblockCookie && config.adBanner) {
      const url = TEST_URLS[provider] || DEFAULT_URL;
      fetch(url, {
        method: "HEAD",
        mode: "no-cors",
        cache: "no-store",
      })
        .then(() => {
          cookies.set(cookies.NAMES.ADBLOCK_DETECTED, "false", { expires: 1 });
          setIsAdblockDetected(false);
        })
        .catch(() => {
          cookies.set(cookies.NAMES.ADBLOCK_DETECTED, "true", { expires: 1 });
          setIsAdblockDetected(true);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isAdblockDetected;
}
