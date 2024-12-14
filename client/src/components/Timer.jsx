import React, { useState, useEffect } from "react";

export default function TimerSection({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-[url('/homeBg.jpg')] bg-no-repeat bg-center bg-contain relative">
      {/* <div className="absolute left-4 md:left-1/4 transform -translate-x-1/2">
        <img
          src="/logo.jpg"
          alt="UniDatez Logo"
          className="object-cover"
          style={{ width: "5em", height: "5em" }} 
        />
      </div> */}
      <div className="flex gap-4">
        {Object.keys(timeLeft).map((interval) => (
          <div key={interval} className="flex flex-col items-center">
            <span className="text-4xl md:text-6xl font-bold mt-5">
              {timeLeft[interval]}
            </span>
            <span className="text-lg md:text-xl">{interval}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
