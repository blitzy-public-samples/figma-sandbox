/**
 * Screen1 — Page component for the first screen of the application.
 *
 * Mapped to the default home route (`/`) in the SPA routing configuration.
 * Uses an indigo/blue accent theme to be visually distinct from
 * Screen 2 (violet) and Screen 3 (emerald). Built exclusively with
 * Tailwind CSS v4 utility classes and semantic HTML.
 *
 * This placeholder is structured so that each section can be
 * individually replaced with actual Figma design content once the
 * design assets become available.
 */

function Screen1() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section with indigo accent */}
      <section className="bg-indigo-600 px-6 py-16 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-indigo-200">
            Screen 1
          </p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight">
            Welcome Home
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-indigo-100">
            Your central hub for managing projects, tracking progress, and
            collaborating with your team — all from one intuitive dashboard.
          </p>
        </div>
      </section>

      {/* Main content area */}
      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Feature highlights */}
        <section aria-label="Feature highlights" className="mb-10">
          <h2 className="mb-6 text-2xl font-semibold text-gray-900">
            Get Started
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 — Projects */}
            <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
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
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                </svg>
              </span>
              <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
              <p className="mt-2 text-sm text-gray-600">
                Organise work into projects with milestones, deadlines, and
                team assignments for full visibility.
              </p>
            </article>

            {/* Card 2 — Analytics */}
            <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
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
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
              </span>
              <h3 className="text-lg font-semibold text-gray-900">
                Analytics
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Monitor key metrics and trends to make data-driven decisions
                that move the needle.
              </p>
            </article>

            {/* Card 3 — Collaboration */}
            <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
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
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </span>
              <h3 className="text-lg font-semibold text-gray-900">
                Collaboration
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Bring your team together with real-time updates, comments, and
                shared workspaces.
              </p>
            </article>
          </div>
        </section>

        {/* Recent activity and quick actions */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Recent activity — spans 2 columns */}
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Recent Activity
            </h2>
            <ul className="divide-y divide-gray-100 text-sm">
              <li className="flex items-center gap-3 py-3">
                <span
                  className="inline-block h-2 w-2 rounded-full bg-indigo-500"
                  aria-hidden="true"
                />
                <span className="flex-1 text-gray-700">
                  New project &ldquo;Website Redesign&rdquo; created
                </span>
                <time className="text-gray-400" dateTime="2026-02-27">
                  Just now
                </time>
              </li>
              <li className="flex items-center gap-3 py-3">
                <span
                  className="inline-block h-2 w-2 rounded-full bg-emerald-500"
                  aria-hidden="true"
                />
                <span className="flex-1 text-gray-700">
                  Task &ldquo;Set up CI pipeline&rdquo; marked complete
                </span>
                <time className="text-gray-400" dateTime="2026-02-27">
                  2 hours ago
                </time>
              </li>
              <li className="flex items-center gap-3 py-3">
                <span
                  className="inline-block h-2 w-2 rounded-full bg-amber-500"
                  aria-hidden="true"
                />
                <span className="flex-1 text-gray-700">
                  Comment added to &ldquo;Q1 Planning&rdquo;
                </span>
                <time className="text-gray-400" dateTime="2026-02-26">
                  Yesterday
                </time>
              </li>
              <li className="flex items-center gap-3 py-3">
                <span
                  className="inline-block h-2 w-2 rounded-full bg-indigo-500"
                  aria-hidden="true"
                />
                <span className="flex-1 text-gray-700">
                  Milestone &ldquo;Alpha Release&rdquo; due date updated
                </span>
                <time className="text-gray-400" dateTime="2026-02-25">
                  2 days ago
                </time>
              </li>
            </ul>
          </section>

          {/* Quick actions sidebar */}
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Quick Actions
            </h2>
            <ul className="space-y-3">
              <li>
                <span className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-indigo-600"
                    aria-hidden="true"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Create New Project
                </span>
              </li>
              <li>
                <span className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-indigo-600"
                    aria-hidden="true"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <line x1="20" y1="8" x2="20" y2="14" />
                    <line x1="23" y1="11" x2="17" y2="11" />
                  </svg>
                  Invite Team Member
                </span>
              </li>
              <li>
                <span className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-indigo-600"
                    aria-hidden="true"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="12" y1="18" x2="12" y2="12" />
                    <line x1="9" y1="15" x2="15" y2="15" />
                  </svg>
                  Generate Report
                </span>
              </li>
            </ul>
          </section>
        </div>

        {/* Footer note */}
        <footer className="mt-12 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          <p>
            This placeholder will be replaced with the actual Figma Screen 1
            design once the design assets are provided.
          </p>
        </footer>
      </div>
    </div>
  )
}

export default Screen1
