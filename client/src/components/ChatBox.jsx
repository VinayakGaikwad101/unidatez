import React, { useState } from "react";
import { X, Send } from "lucide-react";

const ChatBox = ({ selectedUser, onClose }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    // TODO: Implement send message functionality
    console.log("Sending message:", message);
    setMessage("");
  };

  return (
    <div className="fixed bottom-40 right-0 w-full bg-white shadow-md flex flex-col z-20 transition-all duration-300 ease-in-out">
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
      <div className="flex-grow overflow-y-auto p-4 bg-white h-full">
        {/* Chat messages will go here */}
        <div className="text-center text-gray-500 my-4">
          Start of your conversation with {selectedUser.name}
        </div>
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
