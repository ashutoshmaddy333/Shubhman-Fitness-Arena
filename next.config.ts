import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /** Keep Three.js / R3F out of the server bundle */
  serverExternalPackages: ["three", "@react-three/fiber", "@react-three/drei"],
};

export default nextConfig;
