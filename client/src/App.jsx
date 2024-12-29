import React, { useEffect, useState } from "react";
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

const ProtectedRoute = ({ children }) => {
  const { authUser } = useAuthStore();
  return authUser ? (
    <>
      <Header /> {children}
    </>
  ) : (
    <Navigate to="/login" />
  );
};

const App = () => {
  const [targetDate, setTargetDate] = useState(new Date("2024-12-31T23:59:59"));

  const { checkAuth, authUser, checkingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) return null;

  return (
    <Router>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <main className="min-h-screen bg-[#ff5470] text-white">
                <TimerSection targetDate={targetDate} />
                <EmailFormSection />
                <AboutUsSection />
              </main>
            </>
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
        {/* Protected Routes */}{" "}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
