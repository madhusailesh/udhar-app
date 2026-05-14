import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  // Theme Toggle State
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Apply dark mode class to html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 transition-colors duration-300 dark:bg-gradient-to-br dark:from-gray-950 dark:via-gray-900 dark:to-black dark:text-white">
      
      {/* NAVBAR */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 md:px-16 md:py-5">
        <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-extrabold text-transparent dark:from-blue-500 dark:to-purple-500 sm:text-3xl">
          Udhar App
        </h1>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="rounded-full p-2 text-gray-600 transition hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? (
              // Sun Icon
              <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              // Moon Icon
              <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          <Link
            to="/login"
            className="hidden rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 sm:block sm:px-5 sm:text-base"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 sm:px-5 sm:text-base"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 px-4 py-12 sm:px-6 md:px-16 md:py-20 lg:flex-row lg:gap-16">
        
        {/* LEFT CONTENT */}
        <div className="flex max-w-2xl flex-col items-center text-center lg:items-start lg:text-left">
          <span className="mb-5 inline-block rounded-full border border-blue-500/30 bg-blue-100 px-4 py-2 text-xs font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 sm:text-sm">
            🚀 Realtime Digital Khata System
          </span>

          <h1 className="mb-6 text-4xl font-black leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Manage{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-500 dark:to-purple-500">
              Udhar
            </span>{" "}
            Easily & Securely
          </h1>

          <p className="mb-8 max-w-lg text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-lg">
            A modern realtime udhar management platform for shopkeepers and customers with an approval system, live balance tracking, and instant updates.
          </p>

          <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              to="/signup"
              className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-center text-lg font-semibold text-white shadow-lg transition hover:scale-105 hover:shadow-xl sm:w-auto"
            >
              Start Free
            </Link>

            <Link
              to="/login"
              className="w-full rounded-2xl border border-gray-300 bg-white px-8 py-4 text-center text-lg font-semibold text-gray-900 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-transparent dark:text-white dark:hover:bg-gray-800 sm:w-auto"
            >
              Login
            </Link>
          </div>

          {/* STATS */}
          <div className="mt-14 flex flex-wrap justify-center gap-6 sm:gap-8 lg:justify-start">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 sm:text-3xl">⚡</h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 sm:text-base">Realtime Updates</p>
            </div>
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 sm:text-3xl">🔒</h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 sm:text-base">Secure Auth</p>
            </div>
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold text-pink-600 dark:text-pink-400 sm:text-3xl">📱</h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 sm:text-base">100% Responsive</p>
            </div>
          </div>
        </div>

        {/* RIGHT CARD VISUAL */}
        <div className="relative w-full max-w-md lg:w-1/2">
          <div className="absolute inset-0 rounded-[40px] bg-gradient-to-r from-blue-500 to-purple-600 opacity-10 blur-2xl dark:opacity-20 dark:blur-3xl"></div>

          <div className="relative w-full rounded-[32px] border border-gray-200 bg-white p-6 shadow-2xl backdrop-blur-xl dark:border-gray-800 dark:bg-white/5 sm:p-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold sm:text-2xl">Sharma Store</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Live Ledger</p>
              </div>
              <div className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700 dark:bg-green-500/20 dark:text-green-400 sm:px-4 sm:py-2 sm:text-sm">
                Live
              </div>
            </div>

            {/* CARD DETAILS */}
            <div className="space-y-4 sm:space-y-5">
              <div className="rounded-2xl bg-gray-50 p-4 dark:bg-gray-900/80 sm:p-5">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Rahul Kumar</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">Pending Balance</p>
                  </div>
                  <span className="text-lg font-bold text-red-500 dark:text-red-400 sm:text-xl">₹1,250</span>
                </div>
                <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                  <div className="h-2 w-2/3 rounded-full bg-gradient-to-r from-red-500 to-orange-500"></div>
                </div>
              </div>

              <div className="rounded-2xl bg-gray-50 p-4 dark:bg-gray-900/80 sm:p-5">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Priya Sharma</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">Pending Balance</p>
                  </div>
                  <span className="text-lg font-bold text-yellow-600 dark:text-yellow-400 sm:text-xl">₹850</span>
                </div>
                <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                  <div className="h-2 w-1/2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500"></div>
                </div>
              </div>

              <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-5 text-white sm:p-6">
                <h3 className="mb-1 text-lg font-bold sm:mb-2 sm:text-xl">Total Active Udhar</h3>
                <h1 className="text-3xl font-black sm:text-4xl">₹2,100</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:px-16 md:py-20">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-black sm:text-4xl">
            Why Use{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-500 dark:to-purple-500">
              Udhar App?
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-gray-600 dark:text-gray-400 sm:text-lg">
            Built for modern shopkeepers who want realtime digital khata management.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {/* CARD 1 */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-xl dark:border-gray-800 dark:bg-white/5 dark:shadow-none dark:backdrop-blur-xl sm:p-8">
            <div className="mb-4 text-4xl sm:mb-5 sm:text-5xl">⚡</div>
            <h3 className="mb-2 text-xl font-bold sm:mb-3 sm:text-2xl">Realtime Sync</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 sm:text-base">
              Instantly update balances and approvals using Socket.io realtime technology.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-2 hover:border-purple-500 hover:shadow-xl dark:border-gray-800 dark:bg-white/5 dark:shadow-none dark:backdrop-blur-xl sm:p-8">
            <div className="mb-4 text-4xl sm:mb-5 sm:text-5xl">🔒</div>
            <h3 className="mb-2 text-xl font-bold sm:mb-3 sm:text-2xl">Secure Approval</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 sm:text-base">
              Customers approve or reject requests before ledger updates happen.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="sm:col-span-2 lg:col-span-1 rounded-3xl border border-gray-200 bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-2 hover:border-pink-500 hover:shadow-xl dark:border-gray-800 dark:bg-white/5 dark:shadow-none dark:backdrop-blur-xl sm:p-8">
            <div className="mb-4 text-4xl sm:mb-5 sm:text-5xl">📱</div>
            <h3 className="mb-2 text-xl font-bold sm:mb-3 sm:text-2xl">Mobile Friendly</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 sm:text-base">
              Fully responsive modern UI that works smoothly on all devices.
            </p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="px-4 py-16 sm:px-6 md:px-16 md:py-24">
        <div className="mx-auto max-w-5xl rounded-[32px] border border-blue-100 bg-blue-50 px-6 py-10 text-center shadow-xl dark:border-gray-800 dark:bg-gradient-to-r dark:from-blue-600/20 dark:to-purple-600/20 dark:shadow-none dark:backdrop-blur-xl sm:rounded-[40px] sm:p-12">
          <h2 className="mb-4 text-3xl font-black sm:mb-5 sm:text-4xl md:text-5xl">
            Start Managing Udhar{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
              Digitally
            </span>
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-base text-gray-600 dark:text-gray-400 sm:mb-10 sm:text-lg">
            Join the modern way of maintaining khata with realtime approvals and live tracking.
          </p>

          <Link
            to="/signup"
            className="inline-block rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:scale-105 hover:shadow-xl sm:px-10 sm:py-5 sm:text-xl"
          >
            Create Free Account
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 py-8 text-center text-sm text-gray-500 dark:border-gray-800 dark:text-gray-500 sm:text-base">
        <div className="px-4">
          © {new Date().getFullYear()} Udhar App. Built by{" "}
          <a
            href="https://www.linkedin.com/in/madhu-sailesh-sasamal-6918912a4/"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            Madhu Sailesh Sasamal
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Home;