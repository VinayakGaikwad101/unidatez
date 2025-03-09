import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useAuthStore } from "../../store/useAuthStore";

const EmailModal = ({ isOpen, onClose, onSubmit, loading }) => {
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h3 className="text-xl font-semibold text-pink-600 mb-4">
          Resend OTP
        </h3>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="email-modal"
              className="block text-sm font-medium text-pink-700"
            >
              Enter Email
            </label>
            <input
              id="email-modal"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-pink-300 rounded-md text-sm shadow-sm placeholder-pink-400
                       focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
              placeholder="Enter your email"
            />
          </div>
          <button
            onClick={() => onSubmit(email)}
            disabled={loading}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </div>
      </div>
    </div>
  );
};

const EmailVerification = () => {
  const [otp, setOtp] = useState("");
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { verifyOTP, loading, resendOTP } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const emailFromSignup = location.state?.email;

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    verifyOTP({ email: emailFromSignup, code: otp }, navigate);
  };

  const handleResendOTP = async (email) => {
    if (countdown === 0) {
      const success = await resendOTP(email);
      if (success) {
        setShowEmailModal(false);
        setCountdown(60);
        toast.success("OTP sent successfully");
      }
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

      {/* OTP verification form */}
      <div className="z-10 w-full max-w-md p-8 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg shadow-xl m-4">
        <h2 className="text-3xl font-semibold text-pink-600 mb-6 text-center">
          Email Verification
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
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
            disabled={loading}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
        <div className="mt-4 text-center space-y-4">
          <button
            onClick={() => setShowEmailModal(true)}
            className="text-pink-600 hover:text-pink-700 font-medium"
          >
            Didn't receive OTP?
          </button>
          {countdown > 0 && (
            <div className="text-sm text-gray-600">
              Resend available in {countdown}s
            </div>
          )}
        </div>
        <p className="mt-4 text-center text-sm text-pink-600">
          New to UniDatez?{" "}
          <Link
            to="/signup"
            className="font-medium text-pink-700 hover:text-pink-800"
          >
            Sign Up
          </Link>
        </p>
      </div>

      {/* Email Modal */}
      <EmailModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        onSubmit={handleResendOTP}
        loading={loading}
      />
      
      <Toaster position="top-center" />
    </div>
  );
};

export default EmailVerification;
