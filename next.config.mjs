import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const requestConfigAbs = path.join(__dirname, "src/i18n/request.ts");
const requestConfigRel = "./src/i18n/request.ts";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "opengraph.githubassets.com",
      },
    ],
  },
  turbopack: {
    resolveAlias: {
      "next-intl/config": requestConfigRel,
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "next-intl/config": requestConfigAbs,
    };
    return config;
  },
};

export default nextConfig;
