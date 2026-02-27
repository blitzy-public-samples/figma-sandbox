import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App'
import './index.css'

/**
 * Application entry point.
 *
 * Bootstraps the React application by:
 * 1. Creating a concurrent React root attached to the `#root` DOM element
 *    defined in `index.html`.
 * 2. Wrapping the component tree in `<StrictMode>` to surface development
 *    warnings (double-rendering, deprecated API detection). StrictMode has
 *    zero impact on production builds.
 * 3. Wrapping the component tree in `<BrowserRouter>` to provide the
 *    client-side routing context that `<Routes>` / `<Route>` inside
 *    `App.tsx` depend on.
 *
 * Render order (outer → inner):
 *   StrictMode → BrowserRouter → App
 *
 * This file is the ONLY place in the application where:
 * - `createRoot` is called (single mount point)
 * - `BrowserRouter` is rendered (single router provider)
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
