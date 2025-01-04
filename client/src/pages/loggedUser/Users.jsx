import React, { useEffect, useState } from "react";
import { useManageUserStore } from "../../store/useManageUserStore";
import { Heart, X, Shield, UserCheck, RotateCcw } from "lucide-react";

const Users = () => {
  const {
    allUsers,
    likedUsers,
    dislikedUsers,
    blockedUsers,
    matchedUsers,
    isLoading,
    fetchLikedUsers,
    fetchDislikedUsers,
    fetchBlockedUsers,
    fetchMatchedUsers,
    revertAction,
  } = useManageUserStore();

  const [activeTab, setActiveTab] = useState("liked");

  useEffect(() => {
    fetchLikedUsers();
    fetchDislikedUsers();
    fetchBlockedUsers();
    fetchMatchedUsers();
  }, [
    fetchLikedUsers,
    fetchDislikedUsers,
    fetchBlockedUsers,
    fetchMatchedUsers,
  ]);

  const renderUserTable = (action) => {
    let users;
    switch (action) {
      case "like":
        users = allUsers.filter((user) =>
          likedUsers.some((u) => u._id === user._id)
        );
        break;
      case "dislike":
        users = allUsers.filter((user) =>
          dislikedUsers.some((u) => u._id === user._id)
        );
        break;
      case "block":
        users = allUsers.filter((user) =>
          blockedUsers.some((u) => u._id === user._id)
        );
        break;
      case "match":
        users = allUsers.filter((user) =>
          matchedUsers.some((u) => u._id === user._id)
        );
        break;
      default:
        users = [];
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Image</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Age</th>
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="py-2 px-4">
                  <img
                    src={user.image || "/avatar.png"}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.age}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => revertAction(user, action)}
                    className="flex items-center text-blue-500 hover:text-blue-700"
                  >
                    <RotateCcw size={16} className="mr-1" />
                    Revert
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start p-4 overflow-hidden">
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
      <div className="relative z-10 w-full max-w-4xl bg-white bg-opacity-90 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">User Management</h1>
        <div className="flex justify-center mb-6">
          <button
            className={`mx-2 px-4 py-2 rounded-full ${
              activeTab === "liked" ? "bg-pink-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("liked")}
          >
            <Heart size={20} className="inline-block mr-2" />
            Liked
          </button>
          <button
            className={`mx-2 px-4 py-2 rounded-full ${
              activeTab === "disliked"
                ? "bg-pink-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("disliked")}
          >
            <X size={20} className="inline-block mr-2" />
            Disliked
          </button>
          <button
            className={`mx-2 px-4 py-2 rounded-full ${
              activeTab === "blocked" ? "bg-pink-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("blocked")}
          >
            <Shield size={20} className="inline-block mr-2" />
            Blocked
          </button>
          <button
            className={`mx-2 px-4 py-2 rounded-full ${
              activeTab === "matched" ? "bg-pink-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("matched")}
          >
            <UserCheck size={20} className="inline-block mr-2" />
            Matched
          </button>
        </div>
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <>
            {activeTab === "liked" && renderUserTable("like")}
            {activeTab === "disliked" && renderUserTable("dislike")}
            {activeTab === "blocked" && renderUserTable("block")}
            {activeTab === "matched" && renderUserTable("match")}
          </>
        )}
      </div>
    </div>
  );
};

export default Users;
