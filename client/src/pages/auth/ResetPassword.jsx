import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../../store/useAuthStore";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();
  const { resetPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);
    try {
      const success = await resetPassword(token, newPassword);
      if (success) {
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
          className="mx-auto h-24 w-24 mb-4 rounded-full"
        />
        <h1 className="text-5xl font-bold text-white drop-shadow-lg">
          UniDatez
        </h1>
      </div>

      <div className="z-10 w-full max-w-md p-8 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg shadow-xl m-4">
        <div>
          <h2 className="text-3xl font-semibold text-pink-600 mb-6 text-center">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please enter your new password.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="new-password"
              className="block text-sm font-medium text-pink-700"
            >
              New Password
            </label>
            <div className="relative mt-1">
              <input
                id="new-password"
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                required
                className="block w-full px-3 py-2 bg-white border border-pink-300 rounded-md text-sm shadow-sm placeholder-pink-400
                         focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={toggleNewPasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showNewPassword ? (
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
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-pink-700"
            >
              Confirm Password
            </label>
            <div className="relative mt-1">
              <input
                id="confirm-password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                className="block w-full px-3 py-2 bg-white border border-pink-300 rounded-md text-sm shadow-sm placeholder-pink-400
                         focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showConfirmPassword ? (
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

          <div>
            <button
              type="submit"
              disabled={loading}
              className="relative w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Reset Password"
              )}
            </button>
          </div>
          <div className="text-center">
            <Link
              to="/login"
              className="font-medium text-pink-600 hover:text-pink-500"
            >
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
