import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { UserIcon, HeartIcon, SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

const UserProfile = () => {
  const { authUser } = useAuthStore();
  const navigate = useNavigate();

  const {
    name = "Your name",
    age = "Your age",
    gender = "Your Gender",
    genderPreference = "Your Gender Preference",
    bio = "Nothing to Show, Express Yourself to let others know your true self ;)",
    image = null,
  } = authUser || {};

  const handleUpdateProfile = () => {
    navigate("/update-profile");
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-pink-200 to-pink-400">
      {/* Background image */}
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

      {/* Content overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"></div>

      {/* Profile content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full max-w-3xl px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg flex items-center justify-center bg-pink-100"
          >
            {image ? (
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <UserIcon className="w-24 h-24 text-pink-400" />
            )}
          </motion.div>
          <h2 className="text-4xl font-bold text-white mb-2 text-shadow">
            {name}
          </h2>
          <p className="text-xl text-pink-200">
            {age} • {gender}
          </p>
        </div>

        <div className="space-y-8 mb-12">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-6 shadow-lg"
          >
            <div className="flex items-center mb-4">
              <HeartIcon className="w-6 h-6 text-pink-300 mr-2" />
              <h3 className="text-xl font-semibold text-white">Preference</h3>
            </div>
            <p className="text-pink-100 text-lg">{genderPreference}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-6 shadow-lg"
          >
            <div className="flex items-center mb-4">
              <SparklesIcon className="w-6 h-6 text-pink-300 mr-2" />
              <h3 className="text-xl font-semibold text-white">About Me</h3>
            </div>
            <p className="text-pink-100 text-lg italic">
              &quot;{bio ? bio : "Nothing to show"}&quot;
            </p>
          </motion.div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUpdateProfile}
          className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-4 px-6 rounded-full transition duration-300 ease-in-out transform hover:from-pink-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 shadow-lg"
        >
          Update Profile
        </motion.button>
      </motion.div>
    </div>
  );
};

export default UserProfile;
