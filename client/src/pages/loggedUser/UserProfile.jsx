import React, { useState, useEffect, useRef } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import {
  UserIcon,
  HeartIcon,
  SparklesIcon,
  BookOpenIcon,
  HomeIcon,
  FilmIcon,
  AcademicCapIcon,
  UserGroupIcon,
  PencilIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import { Music, Calendar, User2, Check, X } from "lucide-react";
import { motion } from "framer-motion";
import SEO from "../../components/SEO";

const UserProfile = () => {
  const { authUser, updateUser } = useAuthStore();
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const fileInputRef = useRef(null);

  const nextImage = () => {
    if (authUser.images && authUser.images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === authUser.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (authUser.images && authUser.images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? authUser.images.length - 1 : prev - 1
      );
    }
  };

  const [isHovering, setIsHovering] = useState(false);

  // Auto-advance carousel with pause on hover
  useEffect(() => {
    let interval;
    if (authUser.images && authUser.images.length > 1 && !isHovering) {
      interval = setInterval(() => {
        nextImage();
      }, 3000); // Change image every 3 seconds
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [authUser.images, isHovering]); // Re-run effect if images array changes or hover state changes

  const handleEditImages = () => {
    setShowImageModal(true);
  };


  const handleImageUpload = async () => {
    if (selectedImages.length > 0) {
      let success = true;
      for (const image of selectedImages) {
        const uploadSuccess = await updateUser({ 
          images: [image],
          appendToExisting: true 
        });
        if (!uploadSuccess) {
          success = false;
          break;
        }
      }
      if (success) {
        setSelectedImages([]);
        setShowImageModal(false);
      }
    }
  };

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.slice(0, 3 - (authUser.images?.length || 0));
    
    if (validFiles.length > 0) {
      const compressAndConvert = async (file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement('canvas');
              const MAX_WIDTH = 800;
              const MAX_HEIGHT = 800;
              let width = img.width;
              let height = img.height;
              
              if (width > height) {
                if (width > MAX_WIDTH) {
                  height *= MAX_WIDTH / width;
                  width = MAX_WIDTH;
                }
              } else {
                if (height > MAX_HEIGHT) {
                  width *= MAX_HEIGHT / height;
                  height = MAX_HEIGHT;
                }
              }
              
              canvas.width = width;
              canvas.height = height;
              const ctx = canvas.getContext('2d');
              ctx.drawImage(img, 0, 0, width, height);
              resolve(canvas.toDataURL('image/jpeg', 0.7));
            };
            img.src = e.target.result;
          };
          reader.readAsDataURL(file);
        });
      };

      const compressedImages = await Promise.all(
        validFiles.map(file => compressAndConvert(file))
      );
      setSelectedImages(compressedImages);
    }
  };

  const handleImageDelete = async (imageUrl) => {
    const success = await updateUser({ imageToDelete: imageUrl });
    if (success) {
      setCurrentImageIndex(0);
    }
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest(".edit-controls")) {
      handleCancel();
    }
  };

  useEffect(() => {
    if (editingField) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editingField]);

  const {
    name = "Mystery Explorer 🎭",
    age = "Age is just a number 😉",
    gender = "Yet to reveal 🤫",
    genderPreference = "Open to connections 💫",
    bio = "Ready to write my next chapter... Care to be part of my story? 📖✨",
    images = [],
    collegeStream = "Student on a journey 📚",
    unidatezFor = "Here to make meaningful connections 💝",
    topSpotifyArtist = "Music lover 🎵",
    favouriteMovieSeries = "Netflix & chill enthusiast 🍿",
    topSongsOnSpotify = "Creating my playlist 🎧",
    pronouns = "",
    collegeYear = "Learning & Growing 🌱",
    homeState = "Somewhere amazing 🌍",
  } = authUser || {};

  const handleStartEdit = (field, value) => {
    setEditingField(field);
    // Only remove emoji if it matches one of the default placeholder values
    const defaultValues = {
      name: "Mystery Explorer 🎭",
      age: "Age is just a number 😉",
      gender: "Yet to reveal 🤫",
      genderPreference: "Open to connections 💫",
      bio: "Ready to write my next chapter... Care to be part of my story? 📖✨",
      collegeStream: "Student on a journey 📚",
      unidatezFor: "Here to make meaningful connections 💝",
      topSpotifyArtist: "Music lover 🎵",
      favouriteMovieSeries: "Netflix & chill enthusiast 🍿",
      topSongsOnSpotify: "Creating my playlist 🎧",
      collegeYear: "Learning & Growing 🌱",
      homeState: "Somewhere amazing 🌍",
    };

    // If the value exactly matches the default, remove the emoji, otherwise keep the value as is
    setEditValue(
      value === defaultValues[field] 
        ? value.replace(/\s*[🎭😉🤫💫📖✨💝🎓🌍🎸🍿🎵🎧🌱📚]\s*$/, "").trim()
        : value
    );
  };

  const handleSave = async () => {
    if (editingField && editValue.trim()) {
      try {
        const success = await updateUser({ [editingField]: editValue.trim() });
        if (success) {
          setEditingField(null);
          setEditValue("");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  const handleCancel = () => {
    setEditingField(null);
    setEditValue("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleCancel();
    }
  };

  const InfoCard = ({ icon: Icon, title, content, className = "", field }) => {
    const isEditing = editingField === field;
    const isEditable = field && !["gender", "genderPreference"].includes(field);

    return (
      <div
        className={`relative overflow-hidden rounded-2xl p-4 group backdrop-blur-md ${
          !isEditing && isEditable && "hover:scale-[1.03] hover:-translate-y-1"
        } transition-transform duration-300 ${
          isEditable && !isEditing ? "cursor-pointer" : ""
        } ${className}`}
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
        onClick={() =>
          isEditable && !isEditing && handleStartEdit(field, content)
        }
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 opacity-0 ${
            !isEditing && isEditable && "group-hover:opacity-100"
          } transition-opacity duration-300`}
        />
        <div
          className={`absolute -inset-px bg-gradient-to-r from-pink-500/50 to-purple-500/50 rounded-2xl opacity-0 ${
            !isEditing && isEditable && "group-hover:opacity-100"
          } transition-opacity duration-300`}
          style={{ zIndex: -1 }}
        />

        <div
          className={`flex items-center justify-between mb-3 ${
            !isEditing && isEditable && "group-hover:translate-x-1"
          } transition-transform duration-300`}
        >
          <div className="flex items-center">
            <div
              className={`p-2 rounded-xl bg-gradient-to-br from-pink-400/30 to-purple-400/30 mr-3 ${
                !isEditing &&
                isEditable &&
                "group-hover:from-pink-400/50 group-hover:to-purple-400/50"
              } transition-all duration-300`}
            >
              <Icon className="w-5 h-5 text-white" />
            </div>
            <h3
              className={`text-base md:text-lg font-semibold text-white ${
                !isEditing && isEditable && "group-hover:text-pink-200"
              } transition-colors duration-300`}
            >
              {title}
            </h3>
          </div>
          {isEditable && !isEditing && (
            <PencilIcon className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          )}
        </div>

        <div className="pl-2 border-l-2 border-pink-400/30">
          {isEditing ? (
            <div
              className="flex gap-2 edit-controls"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={handleKeyPress}
                autoFocus
                className="w-full bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <motion.button
                onClick={handleSave}
                className="p-2 bg-green-500/20 rounded-lg transition-colors relative group/save overflow-hidden"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-green-500/20 opacity-0 group-hover/save:opacity-100 transition-opacity duration-300" />
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <Check className="w-5 h-5 text-green-500 relative z-10" />
                </motion.div>
              </motion.button>
              <motion.button
                onClick={handleCancel}
                className="p-2 bg-red-500/20 rounded-lg transition-colors relative group/cancel overflow-hidden"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-red-500/20 opacity-0 group-hover/cancel:opacity-100 transition-opacity duration-300" />
                <motion.div
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5 text-red-500 relative z-10" />
                </motion.div>
              </motion.button>
            </div>
          ) : (
            <p
              className={`text-pink-100/90 text-sm md:text-base leading-relaxed ${
                !isEditing && isEditable && "group-hover:border-pink-400/50"
              } transition-all duration-300 break-words`}
            >
              {content}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <style>
        {`
          .profile-container::-webkit-scrollbar {
            width: 10px;
            background: transparent;
            position: absolute;
            right: 0;
          }
          .profile-container::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, rgba(236, 72, 153, 0.5), rgba(219, 39, 119, 0.5));
            border-radius: 5px;
          }
          .profile-container::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 5px;
          }
          .profile-container {
            scrollbar-gutter: stable;
            padding-right: 10px;
          }
        `}
      </style>
      <SEO
        title={`${name}'s Profile | UniDatez`}
        description={`${bio} ${collegeStream ? `• ${collegeStream}` : ""} ${
          homeState ? `• From ${homeState}` : ""
        } | Connect on UniDatez`}
        type="profile"
      />
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-pink-200 to-pink-400">
        <img
          src="/native_login_bg.jpg"
          alt="Romantic background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

        <div className="profile-container z-10 w-full h-screen overflow-y-auto pt-16">
          <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center space-y-6 w-full">
              {/* Profile Header - Just the image */}
              <div className="text-center relative w-full flex flex-col items-center">
                <div className="relative w-full max-w-md mb-4">
                  {/* Image Carousel */}
                  <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-500 animate-pulse" style={{ filter: "blur(15px)" }}></div>
                    <div className="relative w-full h-full">
                      {authUser.images && authUser.images.length > 0 ? (
                        <div 
                          className="relative w-full h-full group"
                          onMouseEnter={() => setIsHovering(true)}
                          onMouseLeave={() => setIsHovering(false)}
                        >
                          {/* Current Image */}
                          <div className="relative w-full h-full">
                            {authUser.images.map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                alt={`${name}'s profile picture ${index + 1}`}
                                className={`absolute inset-0 w-full h-full object-cover transform transition-all duration-500 ${
                                  index === currentImageIndex 
                                    ? 'opacity-100 scale-100' 
                                    : 'opacity-0 scale-105'
                                }`}
                              />
                            ))}
                          </div>
                          
                          {/* Navigation Arrows */}
                          {authUser.images.length > 1 && (
                            <>
                              <button
                                onClick={prevImage}
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <ChevronLeftIcon className="w-6 h-6 text-white" />
                              </button>
                              <button
                                onClick={nextImage}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <ChevronRightIcon className="w-6 h-6 text-white" />
                              </button>
                            </>
                          )}

                          {/* Image Dots */}
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
                            {authUser.images.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all ${
                                  index === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'
                                }`}
                              />
                            ))}
                          </div>

                          {/* Edit Button */}
                          <button
                            onClick={handleEditImages}
                            className="absolute top-2 right-2 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <PencilIcon className="w-5 h-5 text-white" />
                          </button>
                        </div>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-pink-300 to-purple-400 flex items-center justify-center">
                          <div className="text-center">
                            <UserIcon className="w-16 h-16 md:w-20 md:h-20 text-white mx-auto mb-2" />
                            <button
                              onClick={handleEditImages}
                              className="bg-white/20 px-4 py-2 rounded-lg text-white hover:bg-white/30 transition-colors"
                            >
                              Add Photos
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Content */}
              <div className="w-full space-y-4">
                <InfoCard
                  icon={SparklesIcon}
                  title="About Me"
                  content={bio}
                  className="transform -rotate-1"
                  field="bio"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <InfoCard
                    icon={User2}
                    title="Name"
                    content={name}
                    className="transform rotate-1"
                    field="name"
                  />

                  <InfoCard
                    icon={Calendar}
                    title="Age"
                    content={age}
                    className="transform -rotate-1"
                    field="age"
                  />

                  <InfoCard
                    icon={UserIcon}
                    title="Gender"
                    content={gender}
                    className="transform rotate-1"
                    field="gender"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <InfoCard
                    icon={HeartIcon}
                    title="Gender Preference"
                    content={genderPreference}
                    className="transform -rotate-1"
                    field="genderPreference"
                  />

                  <InfoCard
                    icon={AcademicCapIcon}
                    title="College Stream"
                    content={collegeStream}
                    className="transform rotate-1"
                    field="collegeStream"
                  />

                  <InfoCard
                    icon={BookOpenIcon}
                    title="College Year"
                    content={collegeYear}
                    className="transform -rotate-1"
                    field="collegeYear"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <InfoCard
                    icon={HomeIcon}
                    title="Home State"
                    content={homeState}
                    className="transform rotate-1"
                    field="homeState"
                  />

                  <InfoCard
                    icon={UserGroupIcon}
                    title="Here For"
                    content={unidatezFor}
                    className="transform -rotate-1"
                    field="unidatezFor"
                  />

                  <InfoCard
                    icon={Music}
                    title="Top Artist"
                    content={topSpotifyArtist}
                    className="transform rotate-1"
                    field="topSpotifyArtist"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoCard
                    icon={Music}
                    title="Top Songs"
                    content={topSongsOnSpotify}
                    className="transform -rotate-1"
                    field="topSongsOnSpotify"
                  />

                  <InfoCard
                    icon={FilmIcon}
                    title="Entertainment"
                    content={favouriteMovieSeries}
                    className="transform rotate-1"
                    field="favouriteMovieSeries"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Image Edit Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-lg w-full border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">Edit Photos</h3>
            
            {/* Current Images */}
            {authUser.images && authUser.images.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mb-4">
                {authUser.images.map((img, index) => (
                  <div key={index} className="relative group aspect-square">
                    <img src={img} alt="Profile" className="w-full h-full object-cover rounded-lg" />
                    <button
                      onClick={() => handleImageDelete(img)}
                      className="absolute top-1 right-1 bg-red-500/80 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add New Images */}
            {authUser.images?.length < 3 && (
              <div className="mb-4">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-3 bg-pink-500/20 hover:bg-pink-500/30 text-white rounded-lg transition-colors"
                >
                  Select Photos
                </button>
              </div>
            )}

            {/* Selected Images Preview */}
            {selectedImages.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mb-4">
                {selectedImages.map((img, index) => (
                  <div key={index} className="relative aspect-square">
                    <img src={img} alt="Selected" className="w-full h-full object-cover rounded-lg" />
                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4">
              {selectedImages.length > 0 && (
                <button
                  onClick={handleImageUpload}
                  className="flex-1 py-2 bg-green-500/20 hover:bg-green-500/30 text-white rounded-lg transition-colors"
                >
                  Upload
                </button>
              )}
              <button
                onClick={() => {
                  setShowImageModal(false);
                  setSelectedImages([]);
                }}
                className="flex-1 py-2 bg-red-500/20 hover:bg-red-500/30 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
