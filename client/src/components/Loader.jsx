import React from "react";
import { PuffLoader, RingLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#ff5470]">
      <div className="relative">
        <RingLoader color="#ffffff" size={150} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <PuffLoader color="#ffffff" size={100} />
        </div>
      </div>
    </div>
  );
};

export default Loader;
