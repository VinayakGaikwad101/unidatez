import { create } from "zustand";
import { getSocket } from "../socket/clientSocket";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

export const useMessageStore = create((set, get) => ({
  messages: [],
  lastMessages: {},
  loading: true,

  sendMessage: async (receiverID, content) => {
    try {
      const authUser = useAuthStore.getState().authUser;
      const tempMessage = {
        _id: Date.now(),
        sender: authUser._id,
        receiver: receiverID,
        content,
        pending: true,
        createdAt: new Date().toISOString()
      };

      set((state) => ({
        messages: [...state.messages, tempMessage],
        lastMessages: {
          ...state.lastMessages,
          [receiverID]: tempMessage
        }
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

      set((state) => ({
        messages: state.messages.map((msg) =>
          msg._id === tempMessage._id
            ? { ...data.data, pending: false }
            : msg
        ),
        lastMessages: {
          ...state.lastMessages,
          [receiverID]: data.data
        }
      }));
    } catch (error) {
      console.error("Error sending message:", error.message);
      toast.error(error.message);

      set((state) => ({
        messages: state.messages.filter((msg) => msg._id !== tempMessage._id),
        lastMessages: {
          ...state.lastMessages,
          [receiverID]: state.lastMessages[receiverID]
        }
      }));
    }
  },

  deleteMessage: async (messageId, deleteForAll = false) => {
    try {
      const messageToDelete = get().messages.find(msg => msg._id === messageId);
      if (!messageToDelete) return;

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/messages/${messageId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ deleteForAll }),
        }
      );
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }

      const authUser = useAuthStore.getState().authUser;
      const isOwnMessage = messageToDelete.sender === authUser._id;

      if (deleteForAll) {
        // Update message content for all users
        set((state) => ({
          messages: state.messages.map(msg => 
            msg._id === messageId 
              ? { ...msg, content: "This message was deleted", deletedForAll: true }
              : msg
          ),
        }));
      } else {
        // Remove message from view for the deleting user
        set((state) => ({
          messages: state.messages.filter((msg) => msg._id !== messageId),
        }));

        // Update last messages if needed
        const otherUserId = isOwnMessage ? messageToDelete.receiver : messageToDelete.sender;
        set((state) => {
          const newLastMessages = { ...state.lastMessages };
          if (newLastMessages[otherUserId]?._id === messageId) {
            const nextLastMessage = state.messages
              .filter(msg => 
                ((msg.sender === otherUserId && !msg.deletedForReceiver) || 
                (msg.receiver === otherUserId && !msg.deletedForSender)) &&
                msg._id !== messageId
              )
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
            
            newLastMessages[otherUserId] = nextLastMessage || null;
          }
          return { lastMessages: newLastMessages };
        });
      }

      toast.success(deleteForAll ? "Message deleted for all" : "Message deleted");
    } catch (error) {
      console.error("Error deleting message:", error.message);
      toast.error(error.message);
    }
  },

  getMessages: async (userID) => {
    try {
      set({ loading: true });
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/messages/conversation/${userID}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }

      set((state) => ({ 
        messages: data.messages, 
        loading: false,
        lastMessages: {
          ...state.lastMessages,
          [userID]: data.messages[data.messages.length - 1] || null
        }
      }));
    } catch (error) {
      console.error("Error fetching messages:", error.message);
      toast.error(error.message);
      set({ messages: [], loading: false });
    }
  },

  getLastMessages: async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/messages/last-messages`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }

      const lastMessagesMap = {};
      data.lastMessages.forEach(msg => {
        const authUserId = useAuthStore.getState().authUser._id;
        const otherUserId = msg.sender === authUserId ? msg.receiver : msg.sender;
        lastMessagesMap[otherUserId] = msg;
      });
      
      set({ lastMessages: lastMessagesMap });
    } catch (error) {
      console.error("Error fetching last messages:", error.message);
      toast.error("Failed to fetch recent messages");
    }
  },

  subscribeToMessages: () => {
    const socket = getSocket();
    socket.on("newMessage", (message) => {
      const authUser = useAuthStore.getState().authUser;
      const otherUserId = message.sender === authUser._id ? message.receiver : message.sender;
      
      set((state) => ({ 
        messages: [...state.messages, message],
        lastMessages: {
          ...state.lastMessages,
          [otherUserId]: message
        }
      }));
    });

    socket.on("messageDeleted", ({ messageId, deleteForAll }) => {
      if (deleteForAll) {
        set((state) => ({
          messages: state.messages.map(msg => 
            msg._id === messageId 
              ? { ...msg, content: "This message was deleted", deletedForAll: true }
              : msg
          ),
        }));

        set((state) => {
          const newLastMessages = { ...state.lastMessages };
          for (const [userId, lastMsg] of Object.entries(newLastMessages)) {
            if (lastMsg._id === messageId) {
              newLastMessages[userId] = { 
                ...lastMsg, 
                content: "This message was deleted", 
                deletedForAll: true 
              };
            }
          }
          return { lastMessages: newLastMessages };
        });
      }
    });
  },

  unsubscribeFromMessages: () => {
    const socket = getSocket();
    socket.off("newMessage");
    socket.off("messageDeleted");
  },
}));
