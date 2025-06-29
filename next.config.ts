import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
};

export default nextConfig;
