export default function Modal({ children }) {
  return (
    <div className="bg-gray-500 bg-opacity-25 z-50 h-full w-full fixed top-0 left-0 flex items-center justify-center">
      {/* main modal */}
      <div className="overflow-y-auto overflow-x-hidden justify-center items-center bg-white md:inset-0 w-auto md:w-[30vw] h-[40%] md:min-h-[calc(90%-1rem)] p-4 ">
        {children}
      </div>
    </div>
  );
}
