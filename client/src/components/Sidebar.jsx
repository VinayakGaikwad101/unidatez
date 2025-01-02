"use client";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Heart, Loader, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useMatchStore } from "../store/useMatchStore";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isChatPage = location.pathname === "/chats";

  const toggleSidebar = () => setIsOpen(!isOpen);

  const { getMyMatches, matches, isLoadingMyMatches } = useMatchStore();

  useEffect(() => {
    getMyMatches();
  }, [getMyMatches]);

  return (
    <>
      <div
        className={`
          fixed top-20 bottom-4 left-0 z-10 bg-white shadow-md overflow-hidden transition-all duration-300
          ease-in-out ${isOpen ? "w-64 lg:w-1/2" : "w-0"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 pb-[27px] border-b border-pink-200 flex justify-between items-center">
            <h2 className="text-xl font-bold text-[#ff5470] lg:text-2xl">
              Matches
            </h2>
            <button
              className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={toggleSidebar}
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-4 z-10 relative">
            {isLoadingMyMatches ? (
              <LoadingState />
            ) : matches.length === 0 ? (
              <NoMatchesFound />
            ) : (
              matches.map((match) => (
                <Link key={match._id} to={`/chat/${match._id}`}>
                  <div className="flex items-center mb-4 cursor-pointer hover:bg-pink-50 p-2 rounded-lg transition-colors duration-300">
                    <img
                      src={match.image || "/avatar.png"}
                      alt="User avatar"
                      className="size-12 object-cover rounded-full mr-3 border-2 border-pink-300"
                    />
                    <h3 className="font-semibold text-gray-800">
                      {match.name}
                    </h3>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

      {isChatPage && (
        <button
          className={`fixed top-16 left-4 p-2 bg-white text-[#ff5470] rounded-full z-20 shadow-md hover:bg-[#ff5470] hover:text-white transition-colors duration-300 ${
            isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          onClick={toggleSidebar}
        >
          <Heart size={24} />
        </button>
      )}
    </>
  );
};

export default Sidebar;

const NoMatchesFound = () => (
  <div className="flex flex-col items-center justify-center h-full text-center">
    <Heart className="text-[#ff5470] mb-4" size={48} />
    <h3 className="text-xl font-semibold text-gray-700 mb-2">No Matches Yet</h3>
    <p className="text-gray-500 max-w-xs">
      Don&apos;t worry! Your perfect match is just around the corner. Keep
      looking!
    </p>
  </div>
);

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center h-full text-center">
    <Loader className="text-[#ff5470] mb-4 animate-spin" size={48} />
    <h3 className="text-xl font-semibold text-gray-700 mb-2">
      Loading Matches
    </h3>
    <p className="text-gray-500 max-w-xs">
      We&apos;re finding your perfect matches. This might take a moment...
    </p>
  </div>
);
