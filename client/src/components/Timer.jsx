"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function TimerSection({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [randomImages, setRandomImages] = useState([]);

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

    // Generate 6 random unique numbers between 1 and 10
    const generateRandomImages = () => {
      const numbers = Array.from({ length: 10 }, (_, i) => i + 1);
      const shuffled = numbers.sort(() => 0.5 - Math.random());
      setRandomImages(shuffled.slice(0, 6));
    };

    generateRandomImages();

    return () => {
      clearInterval(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const minWidth = 768; // Set the minimum width (in pixels) for cropping
  const bgSize = windowWidth >= minWidth ? "cover" : `${minWidth}px auto`;
  const bgPosition = windowWidth >= minWidth ? "center" : "center top";

  const handleArrowClick = () => {
    const emailFormSection = document.querySelector("#email-form");
    emailFormSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center bg-no-repeat relative overflow-hidden"
      style={{
        backgroundImage: "url('/homeBg.jpg')",
        backgroundSize: bgSize,
        backgroundPosition: bgPosition,
      }}
    >
      {windowWidth < minWidth && windowWidth > 611 && (
        <div className="absolute top-0 left-0 right-0 flex justify-between p-2">
          <img
            key={`top-${randomImages[0]}`}
            src={`/${randomImages[0]}.jpg`}
            alt={`Image ${randomImages[0]}`}
            className="w-[100px] h-[100px] object-cover rounded-md"
          />
          <img
            key={`top-${randomImages[1]}`}
            src={`/${randomImages[1]}.jpg`}
            alt={`Image ${randomImages[1]}`}
            className="w-[100px] h-[100px] object-cover rounded-md"
          />
        </div>
      )}
      <div className="flex flex-col items-center w-full">
        {/* Timer container with responsive positioning */}
        <div className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-10 -mt-24 sm:-mt-12 md:-mt-12 lg:-mt-8">
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
      </div>
      {windowWidth < minWidth && (
        <div className="absolute bottom-0 left-0 right-0 flex justify-between p-2">
          {randomImages.slice(3, 6).map((num) => (
            <img
              key={`bottom-${num}`}
              src={`/${num}.jpg`}
              alt={`Image ${num}`}
              className="w-[100px] h-[100px] object-cover rounded-md"
            />
          ))}
        </div>
      )}
      {/* Scroll down text and arrow */}
      <div
        className="absolute inset-x-0 flex flex-col items-center text-white cursor-pointer"
        style={{ top: "60%" }}
        onClick={handleArrowClick}
      >
        <span className="text-lg mb-2">Scroll down to know more</span>
        <ChevronDown className="animate-bounce" size={24} />
      </div>
    </section>
  );
}
