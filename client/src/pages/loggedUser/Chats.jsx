import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import ChatBox from "../../components/ChatBox";

const Chats = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="fixed inset-0 pt-[72px]">
      {/* Background Images */}
      <img
        src="/mobile_login_bg.jpg"
        alt="Romantic background"
        className="absolute inset-0 w-full h-full object-cover sm:hidden -z-10"
      />
      <img
        src="/native_login_bg.jpg"
        alt="Romantic background"
        className="absolute inset-0 w-full h-full object-cover hidden sm:block -z-10"
      />

      {/* Chat Interface */}
      <div className="h-full flex">
        {/* Chat List - Always visible on desktop, hidden when chat is selected on mobile */}
        <div className={`
          ${selectedUser ? 'hidden md:block' : 'w-full'} 
          md:w-[350px] lg:w-[400px] 
          bg-white/95 backdrop-blur-sm
          border-r border-pink-100
          h-full
        `}>
          <Sidebar onSelectUser={handleSelectUser} />
        </div>

        {/* Chat Window - Full width on mobile when selected, flex-1 on desktop */}
        <div className={`
          ${selectedUser ? 'w-full md:flex-1' : 'hidden md:flex-1'} 
          bg-white/95 backdrop-blur-sm
          h-full
        `}>
          <ChatBox selectedUser={selectedUser} />
        </div>
      </div>
    </div>
  );
};

export default Chats;
