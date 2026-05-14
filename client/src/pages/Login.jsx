import { useState, useEffect } from "react";
import { loginUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Loading State
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Apply dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Loading start
    
    // Toast ka loading state dikhane ke liye
    const toastId = toast.loading("Logging in...");

    try {
      const data = await loginUser(formData);
      console.log(data);

      // SAVE TOKEN
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Success Alert
      toast.success("Login Successful! Welcome back.", {
        id: toastId,
        duration: 3000,
      });

      // ROLE BASED REDIRECT
      setTimeout(() => {
        if (data.user.role === "shopkeeper") {
          navigate("/shopkeeper");
        } else {
          navigate("/customer");
        }
      }, 1000); // 1 second delay animation enjoy karne ke liye

    } catch (error) {
      console.log(error);
      // Error Alert
      toast.error("Login Failed. Please check your credentials.", {
        id: toastId,
        duration: 4000,
      });
    } finally {
      setIsLoading(false); // Loading stop
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-50 transition-colors duration-500 dark:bg-gray-950">
      
      <Toaster position="top-center" reverseOrder={false} />

      {/* BACKGROUND BLOBS FOR ATTRACTION */}
      <div className="absolute top-[-10%] left-[-10%] h-[40rem] w-[40rem] animate-[spin_20s_linear_infinite] rounded-full bg-blue-400/20 blur-3xl dark:bg-blue-600/20"></div>
      <div className="absolute bottom-[-10%] right-[-10%] h-[40rem] w-[40rem] animate-[spin_25s_linear_infinite_reverse] rounded-full bg-purple-400/20 blur-3xl dark:bg-purple-600/20"></div>

      {/* THEME TOGGLE BUTTON */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="absolute top-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/30 text-gray-800 shadow-lg backdrop-blur-md transition-all hover:scale-110 hover:bg-white/50 dark:bg-gray-800/50 dark:text-yellow-400 dark:hover:bg-gray-700"
      >
        {isDarkMode ? (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>

      {/* LOGIN CARD */}
      <div className="relative z-10 w-full max-w-md animate-[translateY_0.5s_ease-out] p-6">
        <div className="rounded-[2rem] border border-white/40 bg-white/60 p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] backdrop-blur-xl transition-all duration-300 dark:border-gray-800/50 dark:bg-gray-900/60 dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] sm:p-10">
          
          {/* Header Area */}
          <div className="mb-8 text-center">
            <h1 className="mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-black text-transparent dark:from-blue-400 dark:to-purple-400">
              Udhar App
            </h1>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Welcome back! Please login to your account.
            </p>
          </div>

          {/* Form Area */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* Email Input */}
            <div className="group relative">
              <label className="mb-1 block pl-1 text-sm font-medium text-gray-700 transition-colors group-focus-within:text-blue-600 dark:text-gray-300 dark:group-focus-within:text-blue-400">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                required
                className="w-full rounded-2xl border-2 border-transparent bg-white/50 p-4 text-gray-800 outline-none ring-1 ring-gray-200 transition-all placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/20 dark:bg-gray-800/50 dark:text-white dark:ring-gray-700/50 dark:focus:border-blue-500 dark:focus:bg-gray-800"
              />
            </div>

            {/* Password Input */}
            <div className="group relative">
              <label className="mb-1 block pl-1 text-sm font-medium text-gray-700 transition-colors group-focus-within:text-blue-600 dark:text-gray-300 dark:group-focus-within:text-blue-400">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                required
                className="w-full rounded-2xl border-2 border-transparent bg-white/50 p-4 text-gray-800 outline-none ring-1 ring-gray-200 transition-all placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/20 dark:bg-gray-800/50 dark:text-white dark:ring-gray-700/50 dark:focus:border-blue-500 dark:focus:bg-gray-800"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="group relative mt-2 flex w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-lg font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-blue-500/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? (
                <svg className="h-6 w-6 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                "Sign In"
              )}
            </button>

          </form>

          {/* Register Link */}
          <p className="mt-8 text-center text-sm font-medium text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link 
              to="/signup" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-extrabold text-transparent transition-all hover:underline dark:from-blue-400 dark:to-purple-400"
            >
              Register here
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Login;