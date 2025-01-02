import { create } from "zustand";
import toast from "react-hot-toast";
// import { getSocket } from "../socket/socket.client";

export const useMatchStore = create((set) => ({
  matches: [],
  isLoadingMyMatches: false,
  isLoadingUserProfiles: false,
  userProfiles: [],
  swipeFeedback: null,

  getMyMatches: async () => {
    try {
      set({ isLoadingMyMatches: true });
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/matches`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const res = await response.json();
      set({ matches: res.matches });
    } catch (error) {
      set({ matches: [] });
      console.error(error);
      toast.error(`Error ${error.message}` || "Something went wrong");
    } finally {
      set({ isLoadingMyMatches: false });
    }
  },

  getUserProfiles: async () => {
    try {
      set({ isLoadingUserProfiles: true });
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/matches/user-profiles`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const res = await response.json();
      set({ userProfiles: res.users });
    } catch (error) {
      set({ userProfiles: [] });
      toast.error(error.message || "Something went wrong");
    } finally {
      set({ isLoadingUserProfiles: false });
    }
  },

  swipeLeft: async (user) => {
    try {
      set({ swipeFeedback: "passed" });
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/matches/swipe-left/${user._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const res = await response.json();
      if (!res.success) {
        throw new Error("Failed to swipe left");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to swipe left");
    } finally {
      setTimeout(() => set({ swipeFeedback: null }), 1500);
    }
  },

  swipeRight: async (user) => {
    try {
      set({ swipeFeedback: "liked" });
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/matches/swipe-right/${
          user._id
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const res = await response.json();
      if (!res.success) {
        throw new Error("Failed to swipe right");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to swipe right");
    } finally {
      setTimeout(() => set({ swipeFeedback: null }), 1500);
    }
  },

  // subscribeToNewMatches: () => {
  //   try {
  //     const socket = getSocket();
  //     socket.on("newMatch", (newMatch) => {
  //       set((state) => ({
  //         matches: [...state.matches, newMatch],
  //       }));
  //       toast.success("You got a new match!");
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // },

  // unsubscribeFromNewMatches: () => {
  //   try {
  //     const socket = getSocket();
  //     socket.off("newMatch");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // },
}));
