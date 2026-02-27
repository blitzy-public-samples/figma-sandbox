/**
 * Screen2 — Page component for the second screen of the application.
 *
 * Mapped to route `/screen-2` in the SPA routing configuration.
 * Uses a violet/purple accent theme to be visually distinct from
 * Screen 1 and Screen 3 (emerald). Built exclusively with Tailwind CSS v4
 * utility classes and semantic HTML.
 *
 * This placeholder is structured so that each section can be
 * individually replaced with actual Figma design content once the
 * design assets become available.
 */

function Screen2() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section with violet accent */}
      <section className="bg-violet-600 px-6 py-16 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-violet-200">
            Screen 2
          </p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight">
            Analytics Dashboard
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-violet-100">
            Track key performance metrics, monitor trends over time, and gain
            actionable insights from your data — all in one place.
          </p>
        </div>
      </section>

      {/* Main content area */}
      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Stats row */}
        <section aria-label="Key metrics" className="mb-10">
          <h2 className="sr-only">Key Metrics</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-500">Total Views</p>
              <p className="mt-1 text-3xl font-bold text-gray-900">24,812</p>
              <p className="mt-2 flex items-center gap-1 text-sm text-emerald-600">
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>12.5% from last month</span>
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-500">Conversions</p>
              <p className="mt-1 text-3xl font-bold text-gray-900">1,429</p>
              <p className="mt-2 flex items-center gap-1 text-sm text-emerald-600">
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>8.2% from last month</span>
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-500">Bounce Rate</p>
              <p className="mt-1 text-3xl font-bold text-gray-900">32.1%</p>
              <p className="mt-2 flex items-center gap-1 text-sm text-red-600">
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>3.1% from last month</span>
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-500">Avg. Duration</p>
              <p className="mt-1 text-3xl font-bold text-gray-900">4m 32s</p>
              <p className="mt-2 flex items-center gap-1 text-sm text-emerald-600">
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>1.4% from last month</span>
              </p>
            </div>
          </div>
        </section>

        {/* Two-column content area */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Chart placeholder — spans 2 columns */}
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Traffic Overview
              </h2>
              <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700">
                Last 30 days
              </span>
            </div>

            {/* Placeholder bar chart visualisation using fixed Tailwind heights */}
            <div
              className="flex items-end gap-2"
              role="img"
              aria-label="Bar chart showing traffic over the last 12 periods"
            >
              <div className="h-[72px] flex-1 rounded-t-md bg-violet-500" aria-hidden="true" />
              <div className="h-[117px] flex-1 rounded-t-md bg-violet-500" aria-hidden="true" />
              <div className="h-[90px] flex-1 rounded-t-md bg-violet-500" aria-hidden="true" />
              <div className="h-[130px] flex-1 rounded-t-md bg-violet-500" aria-hidden="true" />
              <div className="h-[104px] flex-1 rounded-t-md bg-violet-500" aria-hidden="true" />
              <div className="h-[144px] flex-1 rounded-t-md bg-violet-500" aria-hidden="true" />
              <div className="h-[122px] flex-1 rounded-t-md bg-violet-500" aria-hidden="true" />
              <div className="h-[162px] flex-1 rounded-t-md bg-violet-500" aria-hidden="true" />
              <div className="h-[135px] flex-1 rounded-t-md bg-violet-500" aria-hidden="true" />
              <div className="h-[153px] flex-1 rounded-t-md bg-violet-500" aria-hidden="true" />
              <div className="h-[166px] flex-1 rounded-t-md bg-violet-500" aria-hidden="true" />
              <div className="h-[140px] flex-1 rounded-t-md bg-violet-500" aria-hidden="true" />
            </div>

            <div className="mt-4 flex justify-between text-xs text-gray-400">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
            </div>
          </section>

          {/* Top pages */}
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Top Pages
            </h2>
            <ol className="space-y-4 text-sm">
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
                    1
                  </span>
                  <span className="font-medium text-gray-900">/home</span>
                </div>
                <span className="text-gray-500">8,241</span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
                    2
                  </span>
                  <span className="font-medium text-gray-900">/pricing</span>
                </div>
                <span className="text-gray-500">5,117</span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
                    3
                  </span>
                  <span className="font-medium text-gray-900">/about</span>
                </div>
                <span className="text-gray-500">3,890</span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
                    4
                  </span>
                  <span className="font-medium text-gray-900">/blog</span>
                </div>
                <span className="text-gray-500">2,654</span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
                    5
                  </span>
                  <span className="font-medium text-gray-900">/contact</span>
                </div>
                <span className="text-gray-500">1,910</span>
              </li>
            </ol>
          </section>
        </div>

        {/* Recent activity table */}
        <section className="mt-8 rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Activity
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-100 bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 font-medium text-gray-500">
                    Event
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium text-gray-500">
                    Source
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium text-gray-500">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium text-gray-500">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-6 py-3 text-gray-900">Page viewed</td>
                  <td className="px-6 py-3 text-gray-600">Organic search</td>
                  <td className="px-6 py-3">
                    <span className="inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-3 text-gray-500">2 min ago</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 text-gray-900">Form submitted</td>
                  <td className="px-6 py-3 text-gray-600">Direct</td>
                  <td className="px-6 py-3">
                    <span className="inline-block rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-medium text-violet-800">
                      Processing
                    </span>
                  </td>
                  <td className="px-6 py-3 text-gray-500">15 min ago</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 text-gray-900">File downloaded</td>
                  <td className="px-6 py-3 text-gray-600">Referral</td>
                  <td className="px-6 py-3">
                    <span className="inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-3 text-gray-500">1 hour ago</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 text-gray-900">Account signup</td>
                  <td className="px-6 py-3 text-gray-600">Social media</td>
                  <td className="px-6 py-3">
                    <span className="inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                      Pending
                    </span>
                  </td>
                  <td className="px-6 py-3 text-gray-500">3 hours ago</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Footer note */}
        <footer className="mt-12 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          <p>
            This placeholder will be replaced with the actual Figma Screen 2
            design once the design assets are provided.
          </p>
        </footer>
      </div>
    </div>
  )
}

export default Screen2
