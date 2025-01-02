import React from "react";

const Match = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <img
        src="/mobile_login_bg.jpg"
        alt="Romantic background"
        className="absolute inset-0 w-full h-full object-cover sm:hidden"
      />
      <img
        src="/native_login_bg.jpg"
        alt="Romantic background"
        className="absolute inset-0 w-full h-full object-cover hidden sm:block"
      />
    </div>
  );
};

export default Match;
