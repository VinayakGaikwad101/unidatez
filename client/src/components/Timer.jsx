"use client";

import React, { useState, useEffect } from "react";

export default function TimerSection() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  function calculateTimeLeft() {
    const targetDate = new Date("2025-01-14T00:00:00").getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return {};
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const minWidth = 768; // Set the minimum width (in pixels) for cropping
  const bgSize = windowWidth >= minWidth ? "cover" : `${minWidth}px auto`;
  const bgPosition = windowWidth >= minWidth ? "center" : "center top";

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center bg-no-repeat relative overflow-hidden"
      style={{
        backgroundImage: "url('/homeBg.jpg')",
        backgroundSize: bgSize,
        backgroundPosition: bgPosition,
      }}
    >
      <div className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-10">
        {Object.entries(timeLeft).map(([interval, value]) => (
          <div key={interval} className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white drop-shadow-lg min-w-[2ch] text-center">
              {value}
            </span>
            <span className="text-xs sm:text-sm md:text-lg lg:text-xl text-white capitalize drop-shadow-lg">
              {interval}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
