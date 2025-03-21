import { useEffect } from "react";
import { Heart, Loader } from "lucide-react";
import { useMatchStore } from "../store/useMatchStore";
import { useMessageStore } from "../store/useMessageStore";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = ({ onSelectUser }) => {
  const { getMyMatches, matches, isLoadingMyMatches } = useMatchStore();
  const { getLastMessages, lastMessages, subscribeToMessages, unsubscribeFromMessages } = useMessageStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    getMyMatches();
    getLastMessages();
    subscribeToMessages();

    return () => {
      unsubscribeFromMessages();
    };
  }, [getMyMatches, getLastMessages, subscribeToMessages, unsubscribeFromMessages]);

  const formatMessagePreview = (message) => {
    if (!message) return "";
    const isOwnMessage = message.sender === authUser._id;
    const preview = message.content.length > 30 
      ? message.content.substring(0, 30) + "..."
      : message.content;
    return isOwnMessage ? `You: ${preview}` : preview;
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return "Yesterday";
    } else if (days < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-pink-200">
        <h2 className="text-xl font-bold text-[#ff5470]">
          Chats
        </h2>
      </div>

      <div className="flex-grow overflow-y-auto">
        {isLoadingMyMatches ? (
          <LoadingState />
        ) : matches.length === 0 ? (
          <NoMatchesFound />
        ) : (
          matches.map((match) => {
            const lastMessage = lastMessages[match._id];
            return (
              <div
                key={match._id}
                onClick={() => onSelectUser(match)}
                className="flex items-center px-4 py-3 cursor-pointer hover:bg-pink-50 transition-colors duration-300 border-b border-gray-100"
              >
                <img
                  src={match.image || "/avatar.png"}
                  alt="User avatar"
                  className="w-12 h-12 object-cover rounded-full mr-3 border-2 border-pink-300 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-semibold text-gray-800 truncate">
                      {match.name}
                    </h3>
                    {lastMessage && (
                      <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                        {formatTimestamp(lastMessage.createdAt)}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {lastMessage ? formatMessagePreview(lastMessage) : "Start a conversation"}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Sidebar;

const NoMatchesFound = () => (
  <div className="flex flex-col items-center justify-center h-full text-center p-4">
    <Heart className="text-[#ff5470] mb-4" size={48} />
    <h3 className="text-xl font-semibold text-gray-700 mb-2">No Matches Yet</h3>
    <p className="text-gray-500 max-w-xs">
      Don&apos;t worry! Your perfect match is just around the corner. Keep
      looking!
    </p>
  </div>
);

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center h-full text-center p-4">
    <Loader className="text-[#ff5470] mb-4 animate-spin" size={48} />
    <h3 className="text-xl font-semibold text-gray-700 mb-2">
      Loading Matches
    </h3>
    <p className="text-gray-500 max-w-xs">
      We&apos;re finding your perfect matches. This might take a moment...
    </p>
  </div>
);
