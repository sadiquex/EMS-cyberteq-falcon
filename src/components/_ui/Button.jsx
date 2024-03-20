export default function Button({ children, onClick }) {
  return (
    <button
      className="bg-transparent text-secondaryColor rounded-sm p-4 min-w-[140px] whitespace-nowrap border-2 border-secondaryColor transition-all duration-300 ease-in-out hover:bg-secondaryColor hover:text-primaryColor hover:brightness-110"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
