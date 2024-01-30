import React from "react";

export default function Card({ children, cardType }) {
  // shadow-[0_8px_30px_rgb(0,0,0,0.12)]
  // box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  return (
    <div
      className={`
    max-w-[300px] h-[140px] p-6 flex items-center justify-center flex-col gap-4 border rounded-lg  hover:bg-gray-100 cursor-pointer text-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] ${
      cardType === "portal"
        ? "bg-secondaryColor hover:bg-secondaryColor"
        : "bg-white"
    }
    `}
    >
      {children}
    </div>
  );
}
