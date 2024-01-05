import React from "react";

export default function Card({ children, cardType }) {
  return (
    <div
      className={`
    max-w-[300px] h-[140px] p-6 flex items-center justify-center flex-col gap-4 border rounded-lg shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] hover:bg-gray-100 cursor-pointer ${
      cardType === "portal"
        ? "bg-secondaryColor hover:bg-[rgba(10,32,16,0.9)]"
        : "bg-white"
    }
    `}
    >
      {children}
    </div>
  );
}
