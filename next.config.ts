import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  eslint: {
    ignoreDuringBuilds: false, // Enable ESLint checks during builds
  },
  typescript: {
    ignoreBuildErrors: false, // Enable TypeScript checks during builds
  },
};

export default nextConfig;
