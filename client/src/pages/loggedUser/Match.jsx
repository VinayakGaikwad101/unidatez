import { useEffect } from "react";
import { useMatchStore } from "../../store/useMatchStore";
import { useAuthStore } from "../../store/useAuthStore";
import { Heart, X, ChevronRight, Frown } from "lucide-react";
import Sidebar from "../../components/Sidebar";

const Match = () => {
  const {
    isLoadingUserProfiles,
    getUserProfiles,
    userProfiles,
    swipeLeft,
    swipeRight,
    // subscribeToNewMatches,
    // unsubscribeFromNewMatches,
  } = useMatchStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    getUserProfiles();
  }, [getUserProfiles]);

  // useEffect(() => {
  //   if (authUser) {
  //     subscribeToNewMatches();
  //   }

  //   return () => {
  //     unsubscribeFromNewMatches();
  //   };
  // }, [subscribeToNewMatches, unsubscribeFromNewMatches, authUser]);

  const handleSwipeLeft = (user) => {
    swipeLeft(user);
  };

  const handleSwipeRight = (user) => {
    swipeRight(user);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 overflow-hidden">
      <Sidebar />
      <div className="flex-grow flex flex-col overflow-hidden">
        <main className="flex-grow flex flex-col gap-10 justify-center items-center p-4 relative overflow-hidden">
          {userProfiles.length > 0 && !isLoadingUserProfiles && (
            <>
              <SwipeArea
                userProfiles={userProfiles}
                handleSwipeLeft={handleSwipeLeft}
                handleSwipeRight={handleSwipeRight}
              />
              <SwipeFeedback />
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

const SwipeArea = ({ userProfiles, handleSwipeLeft, handleSwipeRight }) => (
  <div className="flex flex-col items-center space-y-4">
    {userProfiles.map((user) => (
      <div
        key={user._id}
        className="flex items-center justify-between w-full bg-white p-4 rounded-lg shadow-md"
      >
        <div>
          <img
            src={user.image || "/avatar.png"}
            alt={user.name}
            className="h-12 w-12 rounded-full mr-3 border-2 border-pink-300"
          />
          <h3 className="font-semibold text-gray-800">{user.name}</h3>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handleSwipeLeft(user)}
            className="p-2 bg-gray-200 rounded-full hover:bg-red-200 transition-colors"
          >
            <X size={24} className="text-red-500" />
          </button>
          <button
            onClick={() => handleSwipeRight(user)}
            className="p-2 bg-gray-200 rounded-full hover:bg-green-200 transition-colors"
          >
            <ChevronRight size={24} className="text-green-500" />
          </button>
        </div>
      </div>
    ))}
  </div>
);

const NoMoreProfiles = () => (
  <div className="flex flex-col items-center justify-center h-full text-center p-8">
    <Frown className="text-pink-400 mb-6" size={80} />
    <h2 className="text-3xl font-bold text-gray-800 mb-4">
      Woah there, speedy fingers!
    </h2>
    <p className="text-xl text-gray-600 mb-6">
      Bro are you OK? Maybe it&apos;s time to touch some grass.
    </p>
  </div>
);

const LoadingUI = () => (
  <div className="relative w-full max-w-sm h-[28rem]">
    <div className="card bg-white w-96 h-[28rem] rounded-lg overflow-hidden border border-gray-200 shadow-sm">
      <div className="px-4 pt-4 h-3/4">
        <div className="w-full h-full bg-gray-200 rounded-lg" />
      </div>
      <div className="card-body bg-gradient-to-b from-white to-pink-50 p-4">
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    </div>
  </div>
);
