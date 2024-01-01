import React from "react";

export default function Modal({ children }) {
  return (
    // modal container
    <div className="bg-gray-500 bg-opacity-25	 z-50 h-screen w-full fixed top-0 left-0 flex items-center justify-center">
      <div className="overflow-y-auto overflow-x-hidden  justify-center items-center bg-white md:inset-0 w-[30vw] min-h-[calc(90%-1rem)] p-4 ">
        {children}
      </div>
    </div>
  );
}
