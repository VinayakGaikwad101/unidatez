import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { UserIcon, HeartIcon, SparklesIcon, BookOpenIcon, HomeIcon, FilmIcon, AcademicCapIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import { Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../../components/SEO";

const UserProfile = () => {
  const { authUser } = useAuthStore();
  const navigate = useNavigate();

  const {
    name = "Mystery Explorer 🎭",
    age = "Age is just a number 😉",
    gender = "Yet to reveal 🤫",
    genderPreference = "Open to connections 💫",
    bio = "Ready to write my next chapter... Care to be part of my story? 📖✨",
    image = null,
    collegeStream = null,
    unidatezFor = "Here to make meaningful connections 💝",
    topSpotifyArtist = null,
    favouriteMovieSeries = null,
    topSongsOnSpotify = null,
    pronouns = "",
    collegeYear = null,
    homeState = null
  } = authUser || {};

  // SEO title and description based on user data
  const seoTitle = `${name}'s Profile | UniDatez`;
  const seoDescription = `${bio} ${collegeStream ? `• ${collegeStream} Student` : ''} ${homeState ? `• From ${homeState}` : ''} | Connect on UniDatez`;

  const getEducationDisplay = () => {
    if (collegeStream && collegeYear) {
      return `${collegeStream} • ${collegeYear} Year`;
    }
    return "A student on a journey of discovery 🎓";
  };

  const getLocationDisplay = () => {
    return homeState || "Somewhere on this beautiful planet 🌍";
  };

  const getMusicDisplay = () => {
    if (topSpotifyArtist || topSongsOnSpotify) {
      return `${topSpotifyArtist || "Loading playlist"} • ${topSongsOnSpotify || "Creating vibes"} 🎵`;
    }
    return "Ready to share musical vibes! 🎸";
  };

  const getEntertainmentDisplay = () => {
    return favouriteMovieSeries || "Netflix & chill enthusiast 🍿";
  };

  const handleUpdateProfile = () => {
    navigate("/update-profile");
  };

  const InfoCard = ({ icon: Icon, title, content, delay, className = "" }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        scale: 1.03,
        y: -5
      }}
      className={`relative overflow-hidden rounded-2xl p-4 group backdrop-blur-md ${className}`}
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute -inset-px bg-gradient-to-r from-pink-500/50 to-purple-500/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ zIndex: -1 }} />

      <motion.div 
        className="flex items-center mb-3"
        whileHover={{ x: 5 }}
      >
        <div className="p-2 rounded-xl bg-gradient-to-br from-pink-400/30 to-purple-400/30 mr-3 group-hover:from-pink-400/50 group-hover:to-purple-400/50 transition-all duration-300">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-white group-hover:text-pink-200 transition-colors duration-300">{title}</h3>
      </motion.div>
      <p className="text-pink-100/90 text-sm leading-relaxed pl-2 border-l-2 border-pink-400/30 group-hover:border-pink-400/50 transition-all duration-300">{content}</p>
    </motion.div>
  );

  return (
    <>
      <SEO 
        title={seoTitle}
        description={seoDescription}
        type="profile"
      />
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-pink-200 to-pink-400">
        <img
          src="/native_login_bg.jpg"
          alt="Romantic background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="z-10 w-full max-w-4xl px-4 py-6 sm:px-6 lg:px-8 h-screen overflow-y-auto flex justify-center"
        >
          <AnimatePresence>
            <div className="flex flex-col items-center space-y-6 w-full">
              {/* Profile Header */}
              <motion.div 
                className="text-center relative w-full flex flex-col items-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative w-32 h-32 mb-4 flex items-center justify-center"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 animate-pulse" style={{ filter: 'blur(15px)' }}></div>
                  <div className="relative rounded-full overflow-hidden border-4 border-white/50 shadow-xl">
                    {image ? (
                      <img
                        src={image}
                        alt={`${name}'s profile picture`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-pink-300 to-purple-400 flex items-center justify-center">
                        <UserIcon className="w-16 h-16 text-white" />
                      </div>
                    )}
                  </div>
                </motion.div>

                <div className="relative z-10 backdrop-blur-sm bg-white/10 px-8 py-4 rounded-2xl border border-white/20">
                  <motion.h1 
                    className="text-3xl font-bold text-white mb-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    {name} {pronouns && <span className="text-lg">({pronouns})</span>}
                  </motion.h1>
                  <motion.p 
                    className="text-lg text-pink-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {age} • {gender} • {unidatezFor}
                  </motion.p>
                </div>
              </motion.div>

              {/* Profile Content */}
              <div className="w-full space-y-4">
                <InfoCard
                  icon={SparklesIcon}
                  title="About Me"
                  content={bio}
                  delay={0.3}
                  className="transform -rotate-1"
                />

                <div className="grid grid-cols-2 gap-4">
                  <InfoCard
                    icon={HeartIcon}
                    title="Preference"
                    content={genderPreference}
                    delay={0.4}
                    className="transform rotate-1"
                  />

                  <InfoCard
                    icon={AcademicCapIcon}
                    title="Education"
                    content={getEducationDisplay()}
                    delay={0.5}
                    className="transform -rotate-1"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <InfoCard
                    icon={HomeIcon}
                    title="Location"
                    content={getLocationDisplay()}
                    delay={0.6}
                    className="transform rotate-1"
                  />

                  <InfoCard
                    icon={Music}
                    title="Music"
                    content={getMusicDisplay()}
                    delay={0.7}
                    className="transform -rotate-1"
                  />

                  <InfoCard
                    icon={FilmIcon}
                    title="Entertainment"
                    content={getEntertainmentDisplay()}
                    delay={0.8}
                    className="transform rotate-1"
                  />
                </div>
              </div>

              {/* Update Profile Button */}
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleUpdateProfile}
                className="w-full max-w-md overflow-hidden rounded-full relative cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-500 rounded-full opacity-75" style={{ filter: 'blur(8px)' }}></div>
                <div className="relative bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-3 px-6 rounded-full text-center transform transition-all duration-300 hover:from-pink-600 hover:to-red-600">
                  ✨ Complete Your Profile
                </div>
              </motion.div>
            </div>
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
};

export default UserProfile;
