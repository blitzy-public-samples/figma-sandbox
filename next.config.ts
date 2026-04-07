import type { NextConfig } from "next";

/**
 * Next.js 16 configuration for the Area marketing landing page.
 *
 * This configuration is intentionally minimal — the project serves a
 * single responsive landing page with all static assets stored locally
 * under `public/images/`.  No external image domains, custom build
 * plugins, rewrites, or redirects are required at this stage.
 *
 * Security headers and framework identity suppression are configured
 * per OWASP and enterprise security best practices.
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
   * Suppress the `X-Powered-By: Next.js` HTTP response header to
   * prevent framework identity disclosure.  Hiding the server
   * technology reduces the information available to attackers
   * performing reconnaissance.
   */
  poweredByHeader: false,

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

  /**
   * Custom HTTP response headers applied to every route.
   *
   * These security headers follow OWASP recommendations and enterprise
   * security best practices:
   *
   * - X-Content-Type-Options: nosniff
   *     Prevents browsers from MIME-type sniffing, forcing them to
   *     honour the declared Content-Type.
   *
   * - X-Frame-Options: DENY
   *     Blocks the page from being rendered inside an <iframe>,
   *     <frame>, or <object>, mitigating clickjacking attacks.
   *
   * - X-XSS-Protection: 1; mode=block
   *     Enables the legacy browser XSS filter and instructs it to
   *     block the entire page rather than sanitise the response.
   *     While modern browsers rely on CSP instead, this header
   *     provides defence-in-depth for older user agents.
   *
   * @see https://owasp.org/www-project-secure-headers/
   */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
