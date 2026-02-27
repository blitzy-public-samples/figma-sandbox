/**
 * Screen3 — Page component for the third screen of the application.
 *
 * Mapped to route `/screen-3` in the SPA routing configuration.
 * Uses a green/emerald accent theme to be visually distinct from
 * Screen 1 and Screen 2. Built exclusively with Tailwind CSS v4
 * utility classes and semantic HTML.
 *
 * This placeholder is structured so that each section can be
 * individually replaced with actual Figma design content once the
 * design assets become available.
 */

function Screen3() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section with emerald accent */}
      <section className="bg-emerald-600 px-6 py-16 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-emerald-200">
            Screen 3
          </p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight">
            Settings &amp; Preferences
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-emerald-100">
            Manage your account configuration, notification preferences, and
            application settings from a single unified dashboard.
          </p>
        </div>
      </section>

      {/* Main content area */}
      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Settings grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Profile card */}
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
            </div>
            <p className="mb-4 text-sm text-gray-600">
              Update your personal information, avatar, and public-facing
              display name.
            </p>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <dt className="font-medium text-gray-500">Display Name</dt>
                <dd className="text-gray-900">Jane Doe</dd>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <dt className="font-medium text-gray-500">Email</dt>
                <dd className="text-gray-900">jane@example.com</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-gray-500">Role</dt>
                <dd className="text-gray-900">Administrator</dd>
              </div>
            </dl>
          </section>

          {/* Notifications card */}
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </span>
              <h2 className="text-lg font-semibold text-gray-900">
                Notifications
              </h2>
            </div>
            <p className="mb-4 text-sm text-gray-600">
              Choose which alerts and updates you would like to receive and
              how they are delivered.
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center justify-between">
                <span className="text-gray-700">Email notifications</span>
                <span className="inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                  Enabled
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-gray-700">Push notifications</span>
                <span className="inline-block rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                  Disabled
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-gray-700">Weekly digest</span>
                <span className="inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                  Enabled
                </span>
              </li>
            </ul>
          </section>

          {/* Security card */}
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <h2 className="text-lg font-semibold text-gray-900">Security</h2>
            </div>
            <p className="mb-4 text-sm text-gray-600">
              Review your security settings, active sessions, and two-factor
              authentication status.
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center justify-between">
                <span className="text-gray-700">Two-factor auth</span>
                <span className="inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                  Active
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-gray-700">Password updated</span>
                <span className="text-gray-500">12 days ago</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-gray-700">Active sessions</span>
                <span className="text-gray-900 font-medium">3</span>
              </li>
            </ul>
          </section>

          {/* Appearance card */}
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              </span>
              <h2 className="text-lg font-semibold text-gray-900">
                Appearance
              </h2>
            </div>
            <p className="mb-4 text-sm text-gray-600">
              Customise the look and feel of the application, including theme
              mode, accent color, and density.
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center justify-between">
                <span className="text-gray-700">Theme</span>
                <span className="text-gray-900 font-medium">Light</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-gray-700">Accent color</span>
                <span className="flex items-center gap-1.5">
                  <span
                    className="inline-block h-3 w-3 rounded-full bg-emerald-500"
                    aria-hidden="true"
                  />
                  <span className="text-gray-900 font-medium">Emerald</span>
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-gray-700">Density</span>
                <span className="text-gray-900 font-medium">Comfortable</span>
              </li>
            </ul>
          </section>
        </div>

        {/* Footer note */}
        <footer className="mt-12 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          <p>
            This placeholder will be replaced with the actual Figma Screen 3
            design once the design assets are provided.
          </p>
        </footer>
      </div>
    </div>
  )
}

export default Screen3
