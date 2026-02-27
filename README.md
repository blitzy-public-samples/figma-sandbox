# Figma Sandbox

A React + TypeScript single-page application that faithfully reproduces a 3-screen Figma design as a multi-page client-side routed application. Built with Vite for fast development and optimized production builds, styled with Tailwind CSS for pixel-perfect visual fidelity.

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev/) | 19.2.4 | UI component library |
| [TypeScript](https://www.typescriptlang.org/) | 5.9.3 | Static type checking |
| [Vite](https://vite.dev/) | 7.3.1 | Build tool and dev server |
| [React Router](https://reactrouter.com/) | 7.13.1 | Client-side routing |
| [Tailwind CSS](https://tailwindcss.com/) | 4.2.1 | Utility-first CSS framework |
| [ESLint](https://eslint.org/) | 9.39.3 | Code quality linting |

## Prerequisites

Before getting started, ensure you have the following installed:

- **Node.js** >= 20.19.0
- **npm** >= 10.0.0

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd figma-sandbox
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173` with hot module replacement (HMR) enabled for instant feedback during development.

## Available Scripts

| Script | Command | Description |
|---|---|---|
| Development | `npm run dev` | Starts the Vite development server with HMR |
| Build | `npm run build` | Runs TypeScript type checking and Vite production build |
| Preview | `npm run preview` | Serves the production build locally for preview |
| Lint | `npm run lint` | Runs ESLint across the codebase for code quality checks |
| Test | `npm run test` | Runs unit tests with Vitest |

## Project Structure

```
figma-sandbox/
├── src/
│   ├── assets/          # Static assets (images, icons, SVGs)
│   ├── components/      # Shared/reusable components
│   │   ├── Layout.tsx
│   │   └── Navigation.tsx
│   ├── pages/           # Page components (one per Figma screen)
│   │   ├── __tests__/
│   │   │   ├── Screen1.test.tsx
│   │   │   ├── Screen2.test.tsx
│   │   │   └── Screen3.test.tsx
│   │   ├── Screen1.tsx
│   │   ├── Screen2.tsx
│   │   └── Screen3.tsx
│   ├── App.tsx
│   ├── App.test.tsx
│   ├── main.tsx
│   ├── index.css
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── eslint.config.js
└── .gitignore
```

### Directory Overview

- **`src/assets/`** — Static assets exported from the Figma design, including images, icons, and SVG files
- **`src/components/`** — Shared, reusable React components used across multiple pages (e.g., layout wrapper, navigation bar)
- **`src/pages/`** — Page-level React components, each corresponding to one Figma screen and mapped to a unique route
- **`src/pages/__tests__/`** — Unit tests for page components

## Routing

The application implements client-side routing with React Router, mapping each Figma screen to a dedicated URL path:

| Route | Component | Description |
|---|---|---|
| `/` | `Screen1` | Home page — Figma Screen 1 |
| `/screen-2` | `Screen2` | Figma Screen 2 |
| `/screen-3` | `Screen3` | Figma Screen 3 |

Navigation between all three screens is available from every page via the shared `Navigation` component. All route transitions use client-side navigation — no full page reloads.

## Deployment

1. **Build for production:**

   ```bash
   npm run build
   ```

   This generates a production-optimized output in the `dist/` directory.

2. **Deploy the `dist/` folder** to any static file hosting service (e.g., Vercel, Netlify, Cloudflare Pages, AWS S3 + CloudFront, or GitHub Pages).

3. **SPA routing configuration:** Since this is a single-page application with client-side routing, configure your hosting server to redirect all routes to `index.html`. This ensures that direct navigation to `/screen-2` or `/screen-3` works correctly without returning a 404 error.

   Example for common hosts:

   - **Netlify:** Create a `public/` directory and add a `_redirects` file containing `/* /index.html 200`
   - **Vercel:** Handled automatically for SPAs
   - **Apache:** Configure a `.htaccess` rewrite rule to serve `index.html` for all paths
   - **Nginx:** Add a `try_files $uri $uri/ /index.html` directive

## License

This project is private and not licensed for public distribution.
