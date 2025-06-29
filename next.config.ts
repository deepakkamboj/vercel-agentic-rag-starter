import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath:
    process.env.NODE_ENV === "production" ? "/vercel-agentic-rag-starter" : "",
  assetPrefix:
    process.env.NODE_ENV === "production" ? "/vercel-agentic-rag-starter/" : "",
  // Disable server-side features for static export
  experimental: {
    // Ensure no server-side features are used
  },
};

export default nextConfig;
