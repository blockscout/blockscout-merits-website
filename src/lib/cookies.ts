import Cookies from "js-cookie";

export enum NAMES {
  API_TOKEN = "api_token", // eslint-disable-line no-unused-vars
  REFERRAL_CODE = "ref_code", // eslint-disable-line no-unused-vars
  UUID = "uuid", // eslint-disable-line no-unused-vars
}

export function get(name?: NAMES | undefined | null, serverCookie?: string) {
  if (typeof window === "undefined") {
    return serverCookie ? getFromCookieString(serverCookie, name) : undefined;
  }

  if (name) {
    return Cookies.get(name);
  }
}

export function set(
  name: NAMES,
  value: string,
  attributes: Cookies.CookieAttributes = {},
) {
  attributes.path = "/";

  return Cookies.set(name, value, attributes);
}

export function remove(name: NAMES, attributes: Cookies.CookieAttributes = {}) {
  return Cookies.remove(name, attributes);
}

export function getFromCookieString(
  cookieString: string,
  name?: NAMES | undefined | null,
) {
  return cookieString.split(`${name}=`)[1]?.split(";")[0];
}
