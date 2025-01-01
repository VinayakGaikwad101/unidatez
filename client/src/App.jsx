import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import TimerSection from "./components/Timer";
import EmailFormSection from "./components/Contact";
import { Toaster } from "react-hot-toast";
import AboutUsSection from "./components/About";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import EmailVerification from "./pages/auth/EmailVerification";
import UserProfile from "./pages/loggedUser/UserProfile";
import { useAuthStore } from "./store/useAuthStore";
import Header from "./components/Navbar";
import Chats from "./pages/loggedUser/Chats";
import Users from "./pages/loggedUser/Users";
import Match from "./pages/loggedUser/Match";
import Loader from "./components/Loader";

const ProtectedRoute = ({ children }) => {
  const { authUser, checkingAuth } = useAuthStore();

  if (checkingAuth) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return authUser ? (
    <>
      <Header />
      {children}
    </>
  ) : (
    <Navigate to="/login" />
  );
};

const App = () => {
  const { checkAuth, authUser, checkingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) {
    return <Loader />; // Or a proper loading component
  }

  return (
    <Router>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={
            <main className="min-h-screen bg-[#ff5470] text-white">
              <TimerSection targetDate={new Date("2024-12-31T23:59:59")} />
              <EmailFormSection />
              <AboutUsSection />
            </main>
          }
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/profile" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <Signup /> : <Navigate to="/profile" />}
        />
        <Route
          path="/otp-verification"
          element={
            !authUser ? <EmailVerification /> : <Navigate to="/profile" />
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chats"
          element={
            <ProtectedRoute>
              <Chats />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/find-match"
          element={
            <ProtectedRoute>
              <Match />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
