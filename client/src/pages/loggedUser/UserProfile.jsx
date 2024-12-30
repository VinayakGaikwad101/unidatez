import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { UserIcon } from "@heroicons/react/24/solid";

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
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background image */}
      <img
        src="/mobile_profile_bg.jpg"
        alt="Romantic background"
        className="absolute inset-0 w-full h-full object-cover sm:hidden"
      />
      <img
        src="/native_profile_bg.jpg"
        alt="Romantic background"
        className="absolute inset-0 w-full h-full object-cover hidden sm:block"
      />

      <div className="z-10 w-full max-w-md bg-white bg-opacity-90 backdrop-blur-sm shadow-xl rounded-lg m-4 p-8 transform transition-all duration-300 hover:scale-105">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#ff5470] mb-6">
            Your Profile
          </h2>
          <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#ff5470] shadow-lg flex items-center justify-center bg-gray-200">
            {image ? (
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <UserIcon className="w-20 h-20 text-gray-400" />
            )}
          </div>
          <h3 className="text-2xl font-semibold text-[#ff5470]">{name}</h3>
          <p className="text-gray-600">
            {age} • {gender}
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div>
            <p className="text-sm font-medium text-gray-500">Preference</p>
            <p className="text-[#ff5470]">{genderPreference}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">About Me</p>
            <p className="text-gray-700 italic">&quot;{bio}&quot;</p>
          </div>
        </div>

        <button
          onClick={handleUpdateProfile}
          className="w-full bg-[#ff5470] hover:bg-[#ff3d5c] text-white font-bold py-3 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#ff5470] focus:ring-opacity-50"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
