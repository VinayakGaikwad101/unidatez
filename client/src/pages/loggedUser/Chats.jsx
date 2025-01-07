import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import ChatBox from "../../components/ChatBox";

const Chats = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const handleCloseChat = () => {
    setSelectedUser(null);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <img
        src="/mobile_login_bg.jpg"
        alt="Romantic background"
        className="absolute inset-0 w-full h-full object-cover sm:hidden"
      />
      <img
        src="/native_login_bg.jpg"
        alt="Romantic background"
        className="absolute inset-0 w-full h-full object-cover hidden sm:block"
      />

      <div className="relative w-full h-full">
        <Sidebar onSelectUser={handleSelectUser} />
        <div
          className={`transition-all duration-300 ease-in-out ${
            selectedUser ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {selectedUser && (
            <ChatBox selectedUser={selectedUser} onClose={handleCloseChat} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Chats;
