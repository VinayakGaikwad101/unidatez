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
      set({ loading: false });
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
      navigate("/profile");
    } catch (error) {
      toast.error(error.message || "Login failed. Please try again.");
      set({ loading: false });
    } finally {
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

      // const data = await response.json();

      if (response.status === 200) {
        toast.success("Logout successful");
        set({ authUser: null });
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  },

  checkAuth: async () => {
    try {
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
      } else {
        set({ authUser: null });
      }
    } catch (error) {
      set({ authUser: null });
      console.log(error);
    } finally {
      set({ checkingAuth: false });
    }
  },

  setAuthUser: (user) => set({ authUser: user }),
}));
