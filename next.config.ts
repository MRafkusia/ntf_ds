import type { NextConfig } from "next";

/**
 * GitHub Pages serves static files from https://<user>.github.io/<repo>/.
 * The repo name (`ntf_ds`) becomes the basePath / assetPrefix in production.
 * Locally we leave basePath empty so the sandbox preview at `/` keeps working.
 *
 *   NEXT_PUBLIC_BASE_PATH=/ntf_ds  → set this in the GitHub Actions workflow
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  // Static HTML export → produces ./out, deployed to GitHub Pages.
  output: "export",

  // Repo-scoped serving path (empty in dev → served at "/").
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,

  // GitHub Pages has no Next.js image optimizer → ship raw images.
  images: {
    unoptimized: true,
  },

  // Generate /route/index.html so Pages serves clean URLs without SPA fallback.
  trailingSlash: true,

  // Expose the basePath to client code (used for fetch() of public assets).
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },

  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: ["*.space-z.ai", "*.chatglm.cn", "localhost"],
};

export default nextConfig;
