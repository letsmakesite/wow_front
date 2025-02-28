import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  output: "export",
  i18n: {
    locales: ["uk", "en"],
    defaultLocale: "uk",
    localeDetection: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wow.utest.site",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
