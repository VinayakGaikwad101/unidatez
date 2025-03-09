import { create } from "zustand";
import toast from "react-hot-toast";
import { disconnectSocket, initializeSocket } from "../socket/clientSocket";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  checkingAuth: true,
  loading: false,

  signup: async (signupData, navigate) => {
    try {
      set({ loading: true });
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupData),
        }
      );

      const data = await response.json();

      if (!data.success) {
        toast.error(data.message || "Registration failed");
        set({ loading: false });
        return;
      }

      toast.success(data.message || "Registration successful");
      set({ loading: false });
      navigate("/otp-verification", { state: { email: signupData.email } });
    } catch (error) {
      toast.error(error.message || "Registration failed. Please try again.");
      set({ loading: false });
    } finally {
      set({ loading: false });
    }
  },

  verifyOTP: async (verificationData, navigate) => {
    try {
      set({ loading: true });
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/verify-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(verificationData),
        }
      );

      const data = await response.json();

      if (!data.success) {
        toast.error(data.message || "Verification Failed");
        set({ loading: false });
        return;
      }

      toast.success(data.message || "Verification Success");
      set({ loading: false });
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Verification Failed");
      set({ loading: false });
    } finally {
      set({ loading: false });
    }
  },

  resendOTP: async (email) => {
    try {
      set({ loading: true });
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/resend-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        toast.error(data.message || "Failed to resend OTP");
        return false;
      }

      toast.success(data.message || "OTP resent successfully");
      return true;
    } catch (error) {
      toast.error(error.message || "Failed to resend OTP");
      return false;
    } finally {
      set({ loading: false });
    }
  },

  login: async (loginData, navigate) => {
    try {
      set({ loading: true });
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
          credentials: "include", // Important: include credentials
        }
      );
      const data = await response.json();

      if (!data.success) {
        toast.error(data.message || "Login failed, please try again");
        set({ loading: false });
        return;
      }

      toast.success(data.message || "Login successful");
      set({ authUser: data.user, loading: false });
      initializeSocket(data.user._id);

      navigate("/profile");
    } catch (error) {
      toast.error(error.message || "Login failed. Please try again.");
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        toast.success("Logout successful");
        set({ authUser: null });
        disconnectSocket();

        return true; // Indicate successful logout
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong during logout");
      return false; // Indicate failed logout
    }
  },

  checkAuth: async () => {
    try {
      set({ checkingAuth: true });
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/me`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Ensure cookies are sent with the request
        }
      );

      const data = await response.json();

      if (data.success) {
        set({ authUser: data.user });
        initializeSocket(data.user._id);
      } else {
        set({ authUser: null });
      }
    } catch (error) {
      set({ authUser: null });
      console.error("Error checking auth:", error);
    } finally {
      set({ checkingAuth: false });
    }
  },

  setAuthUser: (user) => set({ authUser: user }),

  forgotPassword: async (email) => {
    try {
      set({ loading: true });
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        toast.error(data.message || "Failed to send reset email");
        return;
      }

      toast.success(data.message || "Password reset email sent successfully");
      return true;
    } catch (error) {
      toast.error(error.message || "Failed to send reset email");
      return false;
    } finally {
      set({ loading: false });
    }
  },

  resetPassword: async (token, newPassword) => {
    try {
      set({ loading: true });
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, newPassword }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        toast.error(data.message || "Failed to reset password");
        return false;
      }

      toast.success(data.message || "Password reset successful");
      return true;
    } catch (error) {
      toast.error(error.message || "Failed to reset password");
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));
