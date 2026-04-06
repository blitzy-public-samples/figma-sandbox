import type { NextConfig } from "next";

/**
 * Next.js 16 configuration for the Area marketing landing page.
 *
 * This configuration is intentionally minimal — the project serves a
 * single responsive landing page with all static assets stored locally
 * under `public/images/`.  No external image domains, custom build
 * plugins, rewrites, or redirects are required at this stage.
 *
 * @see https://nextjs.org/docs/app/api-reference/config/next-config-js
 */
const nextConfig: NextConfig = {
  /**
   * Enable React strict mode for development-time warnings about
   * deprecated patterns, unsafe lifecycle methods, and side-effect
   * detection in React 19 components.
   */
  reactStrictMode: true,

  /**
   * Image optimization configuration.
   *
   * All images are served from the local `public/images/` directory so
   * no remote patterns or external domains are configured.  The formats
   * array tells the built-in image optimizer to prefer AVIF (smallest
   * file size with high quality) and fall back to WebP — both are
   * widely supported by modern browsers.
   */
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
