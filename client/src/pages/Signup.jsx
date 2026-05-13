import { useState } from "react";
import { signupUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
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
      const data = await signupUser(formData);
      console.log(data);
      alert("✅ Signup Successful! Please login.");
      
      // Redirect to login page after successful signup
      navigate("/"); 
    } catch (error) {
      console.log(error);
      alert("❌ Signup Failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4 transition-colors duration-300 dark:from-gray-900 dark:to-gray-950">
      
      {/* Signup Card */}
      <div className="w-full max-w-md animate-[fadeIn_0.5s_ease-in-out] rounded-3xl border border-gray-200 bg-white/80 p-8 shadow-2xl backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900/80 sm:p-10">
        
        {/* Header Area */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-extrabold text-transparent">
            Create Account
          </h1>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Join Udhar App to manage your khata easily.
          </p>
        </div>

        {/* Form Area */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          {/* Name Input */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3.5 text-gray-800 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 dark:focus:bg-gray-800"
            />
          </div>

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
              placeholder="Create a password"
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-300 bg-gray-50 p-3.5 text-gray-800 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 dark:focus:bg-gray-800"
            />
          </div>

          {/* Role Selection */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Select Role
            </label>
            <select
              name="role"
              onChange={handleChange}
              value={formData.role}
              className="w-full appearance-none rounded-xl border border-gray-300 bg-gray-50 p-3.5 text-gray-800 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 dark:focus:bg-gray-800"
            >
              <option value="customer">Customer (Udhar Lene Wala)</option>
              <option value="shopkeeper">Shopkeeper (Dukandar)</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3.5 text-lg font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-purple-500/30 active:scale-[0.98]"
          >
            Sign Up
          </button>

        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <span 
            onClick={() => navigate("/")} 
            className="cursor-pointer font-bold text-blue-600 transition-colors hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
          >
            Login here
          </span>
        </p>

      </div>
    </div>
  );
}

export default Signup;