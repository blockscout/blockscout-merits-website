import mixpanel from "mixpanel-browser";

interface UserProfileProperties {
  "With Account": boolean;
  "Device Type": string;
  "First Time Join": string;
}

export function set(props: Partial<UserProfileProperties>) {
  mixpanel.people.set(props);
}

export function setOnce(props: Partial<UserProfileProperties>) {
  mixpanel.people.set_once(props);
}
