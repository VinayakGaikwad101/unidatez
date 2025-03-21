import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import {
  User,
  LogOut,
  Menu,
  X,
  MessageCircle,
  Users,
  Heart,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const { authUser, logout } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navItems = [
    { name: "Profile", path: "/profile", icon: User },
    { name: "Chats", path: "/chats", icon: MessageCircle },
    { name: "Users", path: "/users", icon: Users },
    { name: "Find a Match", path: "/find-match", icon: Heart },
  ];

  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const linkVariants = {
    hover: { scale: 1.1, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
  };

  return (
    <motion.header
      className="bg-[#ff5470] shadow-lg fixed top-0 left-0 right-0 z-50"
      initial="hidden"
      animate="visible"
      variants={headerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center space-x-2">
              <img
                src="/logo.jpg"
                alt="UniDatez"
                className="w-10 h-10 rounded-full"
              />
              <span className="text-2xl font-bold text-white"></span>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {authUser && authUser.name && (
              <div className="flex items-center space-x-2">
                {authUser.image ? (
                  <img
                    src={authUser.image}
                    alt={authUser.name}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <User className="w-8 h-8 text-white" />
                )}
                <span className="text-xl font-bold text-white">
                  {authUser.name}!
                </span>
              </div>
            )}
          </motion.div>

          <nav className="hidden md:flex items-center space-x-4">
            {authUser ? (
              <>
                {navItems.map((item) => (
                  <motion.div
                    key={item.name}
                    variants={linkVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-1 text-white hover:text-pink-200 transition duration-150 ease-in-out ${
                        location.pathname === item.path ? "font-bold" : ""
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
                <motion.button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-white hover:text-pink-200 transition duration-150 ease-in-out"
                  variants={linkVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </motion.button>
              </>
            ) : (
              <>
                <motion.div
                  variants={linkVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link
                    to="/login"
                    className="text-white hover:text-pink-200 transition duration-150 ease-in-out"
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div
                  variants={linkVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link
                    to="/signup"
                    className="bg-white text-[#ff5470] px-4 py-2 rounded-full font-medium hover:bg-pink-100 transition duration-150 ease-in-out"
                  >
                    Sign Up
                  </Link>
                </motion.div>
              </>
            )}
          </nav>

          <div className="md:hidden">
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden bg-[#ff5470] border-t border-pink-400 absolute w-full"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariants}
          >
            <div className="flex flex-col items-center px-2 pt-2 pb-3 space-y-1">
              {authUser ? (
                <>
                  {navItems.map((item) => (
                    <motion.div
                      key={item.name}
                      variants={linkVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="w-full"
                    >
                      <Link
                        to={item.path}
                        className={`flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-base font-semibold text-white hover:bg-pink-600 ${
                          location.pathname === item.path
                            ? "text-slate-300"
                            : ""
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </Link>
                    </motion.div>
                  ))}
                  <motion.button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center space-x-2 w-full text-left px-3 py-2 rounded-md text-base font-semibold text-white hover:bg-pink-600"
                    variants={linkVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.div
                    variants={linkVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="w-full"
                  >
                    <Link
                      to="/login"
                      className="flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-base font-semibold text-white hover:bg-pink-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className="w-5 h-5" />
                      <span>Login</span>
                    </Link>
                  </motion.div>
                  <motion.div
                    variants={linkVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="w-full"
                  >
                    <Link
                      to="/signup"
                      className="flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-base font-semibold text-white hover:bg-pink-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className="w-5 h-5" />
                      <span>Sign Up</span>
                    </Link>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
