import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleEmailSubmit = async () => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("OTP sent to your email!");
      setStep(2);
      setCountdown(60);
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Signup successful!");
      navigate("/create-profile");
    } catch (error) {
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (countdown > 0) return;
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("OTP resent to your email!");
      setCountdown(60);
    } catch (error) {
      toast.error("Failed to resend OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
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

      {/* Signup form */}
      <div className="z-10 w-full max-w-md p-8 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg shadow-xl m-4">
        <h2 className="text-3xl font-semibold text-pink-600 mb-6 text-center ">Signup</h2>
        {step === 1 ? (
          <form onSubmit={handleEmailSubmit} className="space-y-6">
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
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-pink-700"
              >
                Enter OTP
              </label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-pink-300 rounded-md text-sm shadow-sm placeholder-pink-400
                           focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                placeholder="Enter 6-digit OTP"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>
            <div className="flex justify-between items-center text-sm">
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={countdown > 0 || isLoading}
                className="text-pink-600 hover:text-pink-800 disabled:text-pink-400"
              >
                {countdown > 0 ? `Resend OTP in ${countdown}s` : "Resend OTP"}
              </button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-pink-600 hover:text-pink-800"
              >
                Change Email
              </button>
            </div>
          </form>
        )}
        <p className="mt-4 text-center text-sm text-pink-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-pink-700 hover:text-pink-800"
          >
            Sign in to UniDatez
          </Link>
        </p>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default Signup;
