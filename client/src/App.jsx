import React, { useState } from "react";
import TimerSection from "./components/Timer";
import EmailFormSection from "./components/Contact";
import { Toaster } from "react-hot-toast";
import AboutUsSection from "./components/About";

const App = () => {
  const [targetDate, setTargetDate] = useState(new Date("2024-12-31T23:59:59"));

  return (
    <main className="min-h-screen bg-[#ff5470] text-white">
      <Toaster />
      <TimerSection targetDate={targetDate} />
      <EmailFormSection />
      <AboutUsSection />
    </main>
  );
};

export default App;
