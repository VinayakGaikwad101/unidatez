import { create } from "zustand";
import toast from "react-hot-toast";

export const useManageUserStore = create((set) => {
  const updateAllUsers = (newUsers) => {
    set((state) => {
      const updatedAllUsers = [...state.allUsers];
      newUsers.forEach((user) => {
        const index = updatedAllUsers.findIndex((u) => u._id === user._id);
        if (index === -1) {
          updatedAllUsers.push(user);
        } else {
          updatedAllUsers[index] = { ...updatedAllUsers[index], ...user };
        }
      });
      return { allUsers: updatedAllUsers };
    });
  };

  return {
    likedUsers: [],
    dislikedUsers: [],
    blockedUsers: [],
    matchedUsers: [],
    allUsers: [],
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
          updateAllUsers(data.likes);
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
          updateAllUsers(data.dislikes);
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
          updateAllUsers(data.blocked);
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
          updateAllUsers(data.matches);
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
            endpoint = `${
              import.meta.env.VITE_SERVER_URL
            }/api/matches/dislike/${user._id}`;
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
            endpoint = `${
              import.meta.env.VITE_SERVER_URL
            }/api/matches/unblock/${user._id}`;
            successMessage = "User unblocked successfully";
            updateFunction = (state) => ({
              blockedUsers: state.blockedUsers.filter(
                (u) => u._id !== user._id
              ),
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
          set((state) => {
            const updatedState = updateFunction(state);
            const updatedAllUsers = state.allUsers.map((u) =>
              u._id === user._id ? { ...u, ...updatedState } : u
            );
            return { ...updatedState, allUsers: updatedAllUsers };
          });
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
  };
});
