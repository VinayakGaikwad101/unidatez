import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "../../store/useAuthStore";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login({ email, password }, navigate);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background image */}
      <img
        src="/mobile_login_bg.jpg"
        alt="Romantic background"
        className="absolute inset-0 w-full h-full object-cover sm:hidden"
      />
      <img
        src="/native_login_bg.jpg"
        alt="Romantic background"
        className="absolute inset-0 w-full h-full object-cover hidden sm:block"
      />

      {/* UniDatez logo and title */}
      <div className="z-10 text-center mb-8">
        <img
          src="/logo.jpg"
          alt="UniDatez Logo"
          className="mx-auto h-24 w-24 mb-4"
        />
        <h1 className="text-5xl font-bold text-white drop-shadow-lg">
          UniDatez
        </h1>
      </div>

      {/* Login form */}
      <div className="z-10 w-full max-w-md p-8 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg shadow-xl m-4">
        <h2 className="text-3xl font-semibold text-pink-600 mb-6 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-pink-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-pink-300 rounded-md text-sm shadow-sm placeholder-pink-400
                         focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-pink-700"
            >
              Password
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full px-3 py-2 bg-white border border-pink-300 rounded-md text-sm shadow-sm placeholder-pink-400
                           focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? (
                  <EyeSlashIcon
                    className="h-5 w-5 text-gray-500"
                    aria-hidden="true"
                  />
                ) : (
                  <EyeIcon
                    className="h-5 w-5 text-gray-500"
                    aria-hidden="true"
                  />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-pink-600">
          New to UniDatez?{" "}
          <Link
            to="/signup"
            className="font-medium text-pink-700 hover:text-pink-800"
          >
            Sign Up
          </Link>
        </p>
        <p className="mt-4 text-center text-sm text-pink-600">
          Account not verified?{" "}
          <Link
            to="/otp-verification"
            className="font-medium text-pink-700 hover:text-pink-800"
          >
            Verify
          </Link>
        </p>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default Login;
