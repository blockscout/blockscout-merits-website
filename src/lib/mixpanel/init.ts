import _capitalize from "lodash/capitalize";
import mixpanel from "mixpanel-browser";
import { deviceType } from "react-device-detect";

import * as cookies from "~/lib/cookies";
import config from "~/config/app";

import getUuid from "./getUuid";
import * as userProfile from "./userProfile";

export const projectToken = config.mixpanel.projectToken;

export default function init() {
  if (!projectToken) {
    return;
  }

  const isAuth = Boolean(cookies.get(cookies.NAMES.API_TOKEN));
  const userId = getUuid();

  mixpanel.init(projectToken, { track_pageview: "full-url" });

  mixpanel.register({
    Authorized: isAuth,
    "Viewport width": window.innerWidth,
    "Viewport height": window.innerHeight,
    Language: window.navigator.language,
    "Device type": _capitalize(deviceType),
    "User id": userId,
  });

  mixpanel.identify(userId);

  userProfile.set({
    "Device Type": _capitalize(deviceType),
    ...(isAuth ? { "With Account": true } : {}),
  });

  userProfile.setOnce({
    "First Time Join": new Date().toISOString(),
  });
}
