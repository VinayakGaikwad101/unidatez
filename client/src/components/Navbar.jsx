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

  return (
    <header className="bg-[#ff5470] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <img
                src="/logo.jpg"
                alt="UniDatez"
                className="w-10 h-10 rounded-full"
              />
              <span className="text-2xl font-bold text-white">UniDatez</span>
            </div>
          </div>

          <div className="flex items-center justify-center">
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
                  Hello, {authUser.name}!
                </span>
              </div>
            )}
          </div>

          <nav className="hidden md:flex items-center space-x-4">
            {authUser ? (
              <>
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center space-x-1 text-white hover:text-pink-200 transition duration-150 ease-in-out ${
                      location.pathname === item.path ? "font-bold" : ""
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-white hover:text-pink-200 transition duration-150 ease-in-out"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-pink-200 transition duration-150 ease-in-out"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-white text-[#ff5470] px-4 py-2 rounded-full font-medium hover:bg-pink-100 transition duration-150 ease-in-out"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#ff5470] border-t border-pink-400">
          <div className="flex flex-col items-center px-2 pt-2 pb-3 space-y-1">
            {authUser ? (
              <>
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-base font-semibold text-white hover:bg-pink-600 ${
                      location.pathname === item.path ? "text-slate-300" : ""
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                ))}
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center space-x-2 w-full text-left px-3 py-2 rounded-md text-base font-semibold text-white hover:bg-pink-600"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-base font-semibold text-white hover:bg-pink-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-base font-semibold text-white hover:bg-pink-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
