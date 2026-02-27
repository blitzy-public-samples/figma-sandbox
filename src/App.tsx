import { Routes, Route } from 'react-router'

import Layout from './components/Layout'
import Screen1 from './pages/Screen1'
import Screen2 from './pages/Screen2'
import Screen3 from './pages/Screen3'

/**
 * Root application component defining the React Router route configuration.
 *
 * Wraps all routes inside the shared {@link Layout} component so that every
 * page receives a consistent header (with navigation links), main content
 * area, and footer.
 *
 * Route mapping:
 * | Path        | Component | Description                        |
 * |-------------|-----------|------------------------------------|
 * | `/`         | Screen1   | Home page — Figma Screen 1 (default)|
 * | `/screen-2` | Screen2   | Figma Screen 2                     |
 * | `/screen-3` | Screen3   | Figma Screen 3                     |
 *
 * Note: The `<BrowserRouter>` provider is NOT rendered here — it lives in
 * `src/main.tsx` following the separation-of-concerns pattern where the
 * entry point owns the router provider and this component owns the route
 * table.
 *
 * @returns The application shell with layout and route definitions.
 */
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Screen1 />} />
        <Route path="/screen-2" element={<Screen2 />} />
        <Route path="/screen-3" element={<Screen3 />} />
      </Routes>
    </Layout>
  )
}

export default App
