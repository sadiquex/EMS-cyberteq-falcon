// child
function Backdrop({ children, closeModal }) {
  const handleBackdropClick = (e) => {
    // prevent click from affecting other elements (even propagation)
    e.stopPropagation();
    closeModal();
  };

  return (
    <div
      className="bg-gray-800 bg-opacity-25 z-50 h-full w-full fixed top-0 left-0 flex items-center justify-center backdrop-filter backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      {children}
    </div>
  );
}

// parent
export default function Modal({ children, closeModal, type }) {
  const handleModalClick = (e) => {
    // prevent click from affecting other elements (even propagation)
    e.stopPropagation();
  };

  return (
    <Backdrop closeModal={closeModal}>
      {/* main modal */}
      <div
        className={`overflow-y-auto overflow-x-hidden justify-center items-center bg-white md:inset-0 w-auto md:w-[40vw] max-h-[70%] md:min-h-[calc(90%-1rem)] p-4 rounded-lg ${
          type === "employeeDetails" ? "md:w-[70%]" : ""
        }`}
        onClick={handleModalClick}
      >
        {children}
      </div>
    </Backdrop>
  );
}
