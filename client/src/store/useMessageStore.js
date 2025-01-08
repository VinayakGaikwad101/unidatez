import { create } from "zustand";
import { getSocket } from "../socket/clientSocket";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

export const useMessageStore = create((set) => ({
  messages: [],
  loading: true,

  sendMessage: async (receiverID, content) => {
    try {
      const authUser = useAuthStore.getState().authUser;
      const tempMessage = {
        _id: Date.now(),
        sender: authUser._id,
        content,
        pending: true,
      };

      set((state) => ({
        messages: [...state.messages, tempMessage],
      }));

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/messages/send`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ receiverID, content }),
        }
      );
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }

      // Update the temporary message with the actual message from the server
      set((state) => ({
        messages: state.messages.map((msg) =>
          msg._id === tempMessage._id
            ? { ...data.message, pending: false }
            : msg
        ),
      }));

      console.log("Message sent successfully:", data.message);
    } catch (error) {
      console.error("Error sending message:", error.message);
      toast.error(error.message);

      // Remove the temporary message if sending failed
      set((state) => ({
        messages: state.messages.filter((msg) => msg._id !== tempMessage._id),
      }));
    }
  },

  getMessages: async (userID) => {
    try {
      set({ loading: true });
      const response = await fetch(
        `${
          import.meta.env.VITE_SERVER_URL
        }/api/messages/conversation/${userID}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.success) {
        set({ messages: data.messages, loading: false });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error fetching messages:", error.message);
      toast.error(error.message);
      set({ messages: [], loading: false });
    }
  },

  subscribeToMessages: () => {
    const socket = getSocket();
    socket.on("newMessage", (message) => {
      console.log("New message received:", message);
      set((state) => ({ messages: [...state.messages, message] }));
    });
  },

  unsubscribeFromMessages: () => {
    const socket = getSocket();
    socket.off("newMessage");
  },
}));
