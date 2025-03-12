import mixpanel from "mixpanel-browser";

import config from "~/config/app";

import type { EventTypes, EventPayload } from "./utils";

type TrackFnArgs = Parameters<typeof mixpanel.track>;

export default function logEvent<EventType extends EventTypes>(
  type: EventType,
  properties?: EventPayload<EventType>,
  optionsOrCallback?: TrackFnArgs[2],
  callback?: TrackFnArgs[3],
) {
  if (!config.mixpanel.projectToken) return;

  try {
    mixpanel.track(type, properties, optionsOrCallback, callback);
  } catch {} // eslint-disable-line no-empty
}
