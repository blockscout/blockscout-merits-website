import isBrowser from "~/lib/isBrowser";

const getEnvValue = (name: string) => {
  const ENVS = (isBrowser() ? window.__envs : process.env) ?? {};
  return ENVS[name];
};

const config = {
  api: {
    origin: getEnvValue("NEXT_PUBLIC_API_HOST"),
    baseUrl: "/api/v1",
  },
  mixpanel: {
    projectToken: getEnvValue("NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN"),
  },
  reown: {
    projectId: getEnvValue("NEXT_PUBLIC_REOWN_PROJECT_ID"),
  },
  images: {
    baseUrl: getEnvValue("NEXT_PUBLIC_IMAGE_CDN_URL"),
  },
  airtable: {
    apiKey: getEnvValue("NEXT_PUBLIC_AIRTABLE_API_KEY"),
    baseId: getEnvValue("NEXT_PUBLIC_AIRTABLE_BASE_ID"),
  },
  adBanner: getEnvValue("NEXT_PUBLIC_AD_BANNER") === "true",
};

export default config;

export const getApiUrl = (path: string) =>
  `${config.api.origin}${config.api.baseUrl}${path}`;
