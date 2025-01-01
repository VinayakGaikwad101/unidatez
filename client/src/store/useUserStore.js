import { create } from "zustand";
import toast from "react-hot-toast";

export const useUserStore = create((set) => ({
  loading: false,
  updateProfile: async (data) => {
    try {
      set({ loading: true });
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/users/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        }
      );

      const res = await response.json();
      if (res.success) {
        toast.success(res.message);
      } else {
        console.log(res.message);
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      set({ loading: false });
    }
  },
}));
