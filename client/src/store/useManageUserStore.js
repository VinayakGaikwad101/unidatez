import { create } from "zustand";
import toast from "react-hot-toast";

export const useManageUserStore = create((set) => ({
  likedUsers: [],
  dislikedUsers: [],
  blockedUsers: [],
  matchedUsers: [],
  isLoading: false,
  error: null,

  fetchLikedUsers: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/matches/liked-users`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.success) {
        set({ likedUsers: data.likes });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      set({ error: error.message });
      toast.error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchDislikedUsers: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/matches/disliked-users`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.success) {
        set({ dislikedUsers: data.dislikes });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      set({ error: error.message });
      toast.error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchBlockedUsers: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/matches/block-user-profile`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.success) {
        set({ blockedUsers: data.blocked });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      set({ error: error.message });
      toast.error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMatchedUsers: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/matches`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.success) {
        set({ matchedUsers: data.matches });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      set({ error: error.message });
      toast.error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },

  revertAction: async (user, action) => {
    set({ isLoading: true });
    try {
      let endpoint;
      let successMessage;
      let updateFunction;

      switch (action) {
        case "like":
          endpoint = `${import.meta.env.VITE_SERVER_URL}/api/matches/dislike/${
            user._id
          }`;
          successMessage = "User disliked successfully";
          updateFunction = (state) => ({
            likedUsers: state.likedUsers.filter((u) => u._id !== user._id),
            dislikedUsers: [...state.dislikedUsers, user],
          });
          break;
        case "dislike":
          endpoint = `${import.meta.env.VITE_SERVER_URL}/api/matches/like/${
            user._id
          }`;
          successMessage = "User liked successfully";
          updateFunction = (state) => ({
            dislikedUsers: state.dislikedUsers.filter(
              (u) => u._id !== user._id
            ),
            likedUsers: [...state.likedUsers, user],
          });
          break;
        case "block":
          endpoint = `${import.meta.env.VITE_SERVER_URL}/api/matches/unblock/${
            user._id
          }`;
          successMessage = "User unblocked successfully";
          updateFunction = (state) => ({
            blockedUsers: state.blockedUsers.filter((u) => u._id !== user._id),
          });
          break;
        default:
          throw new Error("Invalid action");
      }

      const response = await fetch(endpoint, {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        set(updateFunction);
        toast.success(successMessage);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      set({ error: error.message });
      toast.error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));
