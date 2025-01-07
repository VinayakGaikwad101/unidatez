import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Frown, Loader2, Minimize2 } from "lucide-react";
import { useMatchStore } from "../../store/useMatchStore";
import { useAuthStore } from "../../store/useAuthStore";

const Match = () => {
  const {
    isLoadingUserProfiles,
    getUserProfiles,
    userProfiles,
    swipeLeft,
    swipeRight,
    swipeFeedback,
    subscribeToNewMatches,
    unsubscribeFromNewMatches,
  } = useMatchStore();

  const { authUser } = useAuthStore();
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    getUserProfiles();
  }, [getUserProfiles]);

  useEffect(() => {
    subscribeToNewMatches();
    return () => {
      unsubscribeFromNewMatches();
    };
  }, [subscribeToNewMatches, unsubscribeFromNewMatches]);

  const handleSwipeLeft = (user) => {
    swipeLeft(user);
  };

  const handleSwipeRight = (user) => {
    swipeRight(user);
  };

  const UserTable = () => (
    <div className="w-full max-w-4xl overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-[#ff5470] text-white">
          <tr>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Age</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userProfiles.map((user) => (
            <tr
              key={user._id}
              className="hover:bg-pink-50 transition-colors cursor-pointer"
              onClick={() => setSelectedUser(user)}
            >
              <td className="px-4 py-2">
                <img
                  src={user.image || "/avatar.png"}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </td>
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.age}</td>
              <td className="px-4 py-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSwipeLeft(user);
                  }}
                  className="p-2 bg-white rounded-full hover:bg-red-100 transition-colors mr-2"
                >
                  <X size={20} className="text-red-500" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSwipeRight(user);
                  }}
                  className="p-2 bg-white rounded-full hover:bg-green-100 transition-colors"
                >
                  <Heart size={20} className="text-[#ff5470]" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const ExpandedProfile = ({ user, onClose }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
        <div className="relative">
          <img
            src={user.image || "/avatar.png"}
            alt={user.name}
            className="w-full h-64 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
          >
            <Minimize2 size={24} className="text-gray-600" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-2">
            {user.name}, {user.age}
          </h2>
          <p className="text-gray-600 mb-4">{user.bio}</p>
          <div className="flex justify-between items-center">
            <button
              onClick={() => {
                handleSwipeLeft(user);
                onClose();
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              Dislike
            </button>
            <button
              onClick={() => {
                handleSwipeRight(user);
                onClose();
              }}
              className="px-4 py-2 bg-[#ff5470] text-white rounded-full hover:bg-pink-600 transition-colors"
            >
              Like
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const SwipeFeedback = () => (
    <AnimatePresence>
      {swipeFeedback && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl ${
            swipeFeedback === "liked" ? "text-green-500" : "text-red-500"
          }`}
        >
          {swipeFeedback === "liked" ? <Heart /> : <X />}
        </motion.div>
      )}
    </AnimatePresence>
  );

  const NoMoreProfiles = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <Frown className="text-[#b0243b] mb-6" size={80} />
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Woah there, speedy fingers!
      </h2>
      <p className="text-xl text-gray-600 mb-6">Go touch some grass!</p>
    </div>
  );

  const LoadingUI = () => (
    <div className="flex items-center justify-center h-full">
      <Loader2 className="animate-spin text-[#ff5470]" size={48} />
    </div>
  );

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
      <div className="flex-grow flex flex-col overflow-hidden">
        <main className="flex-grow flex flex-col gap-10 justify-center items-center p-4 relative overflow-hidden">
          {userProfiles.length > 0 && !isLoadingUserProfiles && (
            <>
              <UserTable />
              <SwipeFeedback />
              <AnimatePresence>
                {selectedUser && (
                  <ExpandedProfile
                    user={selectedUser}
                    onClose={() => setSelectedUser(null)}
                  />
                )}
              </AnimatePresence>
            </>
          )}

          {userProfiles.length === 0 && !isLoadingUserProfiles && (
            <NoMoreProfiles />
          )}
          {isLoadingUserProfiles && <LoadingUI />}
        </main>
      </div>
    </div>
  );
};

export default Match;
