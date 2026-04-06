import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**
 * ESLint flat configuration for the Area landing page project.
 *
 * Uses eslint-config-next native flat config exports (Next.js 16+)
 * which provide ESLint 9.x flat config arrays out of the box:
 *
 * - next/core-web-vitals: Next.js rules, React + React Hooks plugins,
 *   accessibility rules, and Core Web Vitals enforcement (warnings → errors)
 * - next/typescript: TypeScript-specific linting via typescript-eslint
 *   with recommended rule presets
 *
 * @see https://nextjs.org/docs/app/api-reference/config/eslint
 */
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
]);

export default eslintConfig;
