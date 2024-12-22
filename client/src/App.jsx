import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TimerSection from "./components/Timer";
import EmailFormSection from "./components/Contact";
import { Toaster } from "react-hot-toast";
import AboutUsSection from "./components/About";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import EmailVerification from "./pages/auth/EmailVerification";

const App = () => {
  const [targetDate, setTargetDate] = useState(new Date("2024-12-31T23:59:59"));

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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp-verification" element={<EmailVerification />} />
      </Routes>
    </Router>
  );
};

export default App;
