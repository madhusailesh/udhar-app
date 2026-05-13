import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  
  // Safe parsing for user data
  const user = JSON.parse(localStorage.getItem("user")) || { name: "Guest", role: "User" };

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  
  // State for mobile menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // APPLY THEME
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="relative z-50 mb-6 w-full rounded-2xl bg-white/70 p-4 shadow-lg backdrop-blur-lg transition-all duration-300 dark:bg-gray-900/80 dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-800">
      
      <div className="flex items-center justify-between">
        {/* LOGO */}
        <div>
          <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-extrabold text-transparent transition-transform duration-300 hover:scale-105 cursor-pointer">
            Udhar App
          </h1>
        </div>

        {/* DESKTOP MENU (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex flex-col items-end">
            <p className="font-bold text-gray-800 dark:text-gray-100">
              {user.name}
            </p>
            <p className="text-xs font-medium tracking-wider text-gray-500 dark:text-gray-400 uppercase">
              {user.role}
            </p>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="group flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-all duration-300 hover:bg-gray-200 hover:scale-110 dark:bg-gray-800 dark:hover:bg-gray-700"
            aria-label="Toggle Theme"
          >
            <span className="text-xl transition-transform duration-500 group-hover:rotate-12">
              {darkMode ? "🌙" : "☀️"}
            </span>
          </button>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-gradient-to-r from-red-500 to-rose-600 px-6 py-2.5 font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-rose-500/30 active:scale-95"
          >
            Logout
          </button>
        </div>

        {/* MOBILE CONTROLS (Hamburger & Theme) */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-all duration-300 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <span className="text-xl">
              {darkMode ? "🌙" : "☀️"}
            </span>
          </button>

          {/* Animated Hamburger Icon */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 transition-all focus:outline-none"
          >
            <span className={`block h-0.5 w-6 bg-gray-800 dark:bg-white transition-all duration-300 ${isMenuOpen ? "translate-y-2 rotate-45" : ""}`}></span>
            <span className={`block h-0.5 w-6 bg-gray-800 dark:bg-white transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}></span>
            <span className={`block h-0.5 w-6 bg-gray-800 dark:bg-white transition-all duration-300 ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}`}></span>
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      <div
        className={`grid transition-all duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-4 rounded-xl bg-gray-50 p-4 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
            
            {/* User Info Mobile */}
            <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-700 pb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-lg font-bold text-white shadow-inner">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-gray-800 dark:text-gray-100">
                  {user.name}
                </p>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  {user.role}
                </p>
              </div>
            </div>

            {/* Logout Mobile */}
            <button
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500/10 px-5 py-3 font-semibold text-red-600 transition-all duration-300 hover:bg-red-500 hover:text-white dark:bg-red-500/20 dark:text-red-400 dark:hover:bg-red-600 dark:hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Logout
            </button>
            
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;