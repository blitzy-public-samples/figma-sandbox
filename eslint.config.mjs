import { defineConfig, globalIgnores } from "eslint/config";
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
 * Next.js 16 removed the `next lint` CLI command. Linting is now invoked
 * directly via `eslint .` (see package.json "lint" script).
 *
 * @see https://nextjs.org/docs/app/api-reference/config/eslint
 */
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  /* Allow require() inside jest.mock() factory functions — standard Jest
     pattern for mocking modules in TypeScript test files. */
  {
    files: ["__tests__/**/*.{ts,tsx}", "**/*.test.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },

  /* Exclude build artifacts, coverage reports, and generated files from
     linting. Mirrors the default ignores that eslint-config-next applies. */
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
