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
};

export default config;

export const getApiUrl = (path: string) =>
  `${config.api.origin}${config.api.baseUrl}${path}`;
