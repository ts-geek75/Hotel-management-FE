"use client";

import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="relative h-5 w-5">
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-black border-r-gray-400" />
      </div>
    </div>
  );
};

export default Loader;
