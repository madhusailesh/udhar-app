import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(formData);
      console.log(data);

      // SAVE TOKEN
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("✅ Login Successful");

      // ROLE BASED REDIRECT
      if (data.user.role === "shopkeeper") {
        navigate("/shopkeeper");
      } else {
        navigate("/customer");
      }
    } catch (error) {
      console.log(error);
      alert("❌ Login Failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4 transition-colors duration-300 dark:from-gray-900 dark:to-gray-950">
      
      {/* Login Card */}
      <div className="w-full max-w-md animate-[fadeIn_0.5s_ease-in-out] rounded-3xl border border-gray-200 bg-white/80 p-8 shadow-2xl backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900/80 sm:p-10">
        
        {/* Header Area */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-extrabold text-transparent">
            Udhar App
          </h1>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Welcome back! Please login to your account.
          </p>
        </div>

        {/* Form Area */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          {/* Email Input */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3.5 text-gray-800 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 dark:focus:bg-gray-800"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3.5 text-gray-800 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 dark:focus:bg-gray-800"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-lg font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-indigo-500/30 active:scale-[0.98]"
          >
            Login
          </button>

        </form>

        {/* Register Link (Optional: agar tere paas register page hai toh iska use kar sakta hai) */}
        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <span 
            onClick={() => navigate("/signup")} 
            className="cursor-pointer font-bold text-blue-600 transition-colors hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
          >
            Register here
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;