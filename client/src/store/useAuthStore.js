import { create } from "zustand";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
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
      set({ authUser: data.user, loading: false });
      navigate("/otp-verification");
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
}));
