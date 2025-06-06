import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: require.resolve("@svgr/webpack"),
          options: {
            svgo: false,
          },
        },
      ],
    });

    config.resolve.fallback = { fs: false, net: false, tls: false };

    config.externals.push("pino-pretty", "lokijs", "encoding");

    return config;
  },
  reactStrictMode: true,
};

export default nextConfig;
