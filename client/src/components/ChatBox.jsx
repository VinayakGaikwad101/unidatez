import React, { useState, useEffect, useRef } from "react";
import { Send, MoreVertical, Trash2, Trash } from "lucide-react";
import { useMessageStore } from "../store/useMessageStore";
import { useAuthStore } from "../store/useAuthStore";

const ChatBox = ({ selectedUser }) => {
  const [message, setMessage] = useState("");
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const {
    messages,
    sendMessage,
    deleteMessage,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useMessageStore();
  const { authUser } = useAuthStore();
  const messagesEndRef = useRef(null);
  const contextMenuRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();

      return () => {
        unsubscribeFromMessages();
      };
    }
  }, [
    selectedUser?._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
        setSelectedMessageId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() && selectedUser?._id) {
      await sendMessage(selectedUser._id, message);
      setMessage("");
    }
  };

  const formatMessageTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleDeleteMessage = async (deleteForAll) => {
    if (selectedMessageId) {
      await deleteMessage(selectedMessageId, deleteForAll);
      setSelectedMessageId(null);
    }
  };

  const handleMenuClick = (messageId, event) => {
    event.stopPropagation();
    setSelectedMessageId(messageId === selectedMessageId ? null : messageId);
  };

  if (!selectedUser) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center text-gray-500">
          <p className="text-lg mb-2">Welcome to Chat</p>
          <p className="text-sm">Select a conversation to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col" ref={chatContainerRef}>
      <div className="flex items-center gap-2 p-3 md:p-4 border-b border-pink-200 bg-white sticky top-0 z-10">
        <img
          src={selectedUser.image || "/avatar.png"}
          alt={selectedUser.name}
          className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-pink-300"
        />
        <h2 className="text-base md:text-lg font-semibold text-[#ff5470] truncate">
          {selectedUser.name}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-3 md:p-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 my-4">
            Start of your conversation with {selectedUser.name}
          </div>
        ) : (
          messages.map((msg, index) => {
            const isOwnMessage = msg.sender === authUser._id;
            return (
              <div
                key={msg._id || index}
                className={`mb-3 flex ${
                  isOwnMessage ? "justify-end" : "justify-start"
                }`}
              >
                <div className="max-w-[75%] flex flex-col relative group">
                  <div className="flex items-center gap-2">
                    {isOwnMessage && (
                      <button
                        onClick={(e) => handleMenuClick(msg._id, e)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity order-first"
                      >
                        <MoreVertical size={16} className="text-gray-500" />
                      </button>
                    )}
                    <div
                      className={`inline-block p-2.5 md:p-3 rounded-2xl break-words ${
                        isOwnMessage
                          ? "bg-[#ff5470] text-white rounded-tr-none"
                          : "bg-white text-gray-800 rounded-tl-none shadow-sm"
                      } ${msg.pending ? "opacity-50" : ""}`}
                    >
                      {msg.deletedForAll ? (
                        <p className="text-sm md:text-base italic opacity-75">This message was deleted</p>
                      ) : (
                        <p className="text-sm md:text-base">{msg.content}</p>
                      )}
                    </div>
                    {!isOwnMessage && (
                      <button
                        onClick={(e) => handleMenuClick(msg._id, e)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity order-last"
                      >
                        <MoreVertical size={16} className="text-gray-500" />
                      </button>
                    )}
                  </div>
                  <span 
                    className={`text-xs text-gray-500 mt-1 ${
                      isOwnMessage ? "text-right" : "text-left"
                    }`}
                  >
                    {formatMessageTime(msg.createdAt)}
                  </span>
                  {selectedMessageId === msg._id && (
                    <div 
                      ref={contextMenuRef}
                      style={{
                        transformOrigin: isOwnMessage ? 'left top' : 'right top'
                      }}
                      className={`absolute z-20 bg-white rounded-lg shadow-lg py-1 min-w-[160px]
                        ${isOwnMessage ? 'left-0' : 'right-0'}
                        animate-in fade-in zoom-in duration-200
                        ${index < 2 ? 'top-0' : 'bottom-full mb-2'}
                      `}
                    >
                      <button
                        onClick={() => handleDeleteMessage(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full transition-colors"
                      >
                        <Trash size={16} />
                        Delete for me
                      </button>
                      {isOwnMessage && !msg.deletedForAll && (
                        <button
                          onClick={() => handleDeleteMessage(true)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full transition-colors"
                        >
                          <Trash2 size={16} />
                          Delete for all
                        </button>
                      )}
                    </div>
                  )}
                </div>
                {msg.pending && (
                  <span className="text-xs text-gray-500 ml-2 self-end">Sending...</span>
                )}
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSendMessage}
        className="p-2 md:p-3 border-t border-gray-200 bg-white sticky bottom-0"
      >
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2.5 md:p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm md:text-base bg-gray-50"
          />
          <button
            type="submit"
            className="bg-[#ff5470] text-white p-2.5 md:p-3 rounded-full hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 flex-shrink-0 shadow-sm"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBox;
