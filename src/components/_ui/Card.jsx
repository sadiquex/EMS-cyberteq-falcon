export default function Card({ children, cardType, otherStyles }) {
  return (
    <div
      className={`
    min-w-[300px] h-[140px] p-6 flex items-center justify-center flex-col gap-4 border rounded-lg hover:bg-gray-100 cursor-pointer text-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] ${otherStyles} ${
        cardType === "portal"
          ? "bg-secondaryColor hover:bg-secondaryColor"
          : "bg-white"
      }
    ${
      cardType === "displayCard"
        ? ""
        : "bg-orange-50 hover:bg-gray-100 transition-all duration-400 ease"
    }
    ${cardType === "imageCard" ? "p-0" : ""}
    ${
      cardType === "textCard"
        ? "capitalize font-semibold flex items-center gap-2 h-auto rounded-none p-0"
        : ""
    }
    
    `}
    >
      {children}
    </div>
  );
}
