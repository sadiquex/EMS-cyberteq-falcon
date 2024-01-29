import React from "react";

export default function Card({ children, cardType }) {
  // shadow-[0_8px_30px_rgb(0,0,0,0.12)]
  // box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  return (
    <div
      className={`
    max-w-[300px] h-[140px] p-6 flex items-center justify-center flex-col gap-4 border rounded-lg  hover:bg-gray-100 cursor-pointer text-black shadow-md ${
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
