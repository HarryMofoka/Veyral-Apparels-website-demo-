import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "thefoschini.vtexassets.com",
      },
      {
        protocol: "https",
        hostname: "gabriellearruda.com",
      },
      {
        protocol: "http",
        hostname: "static.photos",
      },
    ],
  },
};

export default nextConfig;
