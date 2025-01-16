import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["jotai-devtools"],
  experimental: {
    swcPlugins: [
      ["@swc-jotai/debug-label", { atomNames: ["customAtom"] }],
      ["@swc-jotai/react-refresh", { atomNames: ["customAtom"] }],
    ],
  },
};

export default nextConfig;
