import React, { useState, useEffect, useRef } from "react";
import { X, Send } from "lucide-react";
import { useMessageStore } from "../store/useMessageStore";
import { useAuthStore } from "../store/useAuthStore";

const ChatBox = ({ selectedUser, onClose }) => {
  const [message, setMessage] = useState("");
  const {
    messages,
    sendMessage,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useMessageStore();
  const { authUser } = useAuthStore();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => {
      unsubscribeFromMessages();
    };
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      await sendMessage(selectedUser._id, message);
      setMessage("");
    }
  };

  return (
    <div className="fixed bottom-0 right-0 w-full h-[calc(100vh-10rem)] bg-white shadow-md flex flex-col z-20 transition-all duration-300 ease-in-out">
      <div className="flex items-center justify-between p-4 border-b border-pink-200 bg-white">
        <div className="flex items-center">
          <img
            src={selectedUser.image || "/avatar.png"}
            alt={selectedUser.name}
            className="w-10 h-10 rounded-full mr-3 border-2 border-pink-300"
          />
          <h2 className="text-lg font-semibold text-[#ff5470]">
            {selectedUser.name}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <X size={24} />
        </button>
      </div>
      <div className="flex-grow overflow-y-auto p-4 bg-white">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 my-4">
            Start of your conversation with {selectedUser.name}
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={msg._id || index}
              className={`mb-4 ${
                msg.sender === authUser._id ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block p-2 rounded-lg ${
                  msg.sender === authUser._id
                    ? "bg-[#ff5470] text-white"
                    : "bg-gray-200 text-gray-800"
                } ${msg.pending ? "opacity-50" : ""}`}
              >
                {msg.content}
              </div>
              {msg.pending && (
                <span className="text-xs text-gray-500 ml-2">Sending...</span>
              )}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <form
        onSubmit={handleSendMessage}
        className="p-4 border-t border-gray-200 mt-auto bg-white"
      >
        <div className="flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button
            type="submit"
            className="bg-[#ff5470] text-white p-2 rounded-r-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBox;
