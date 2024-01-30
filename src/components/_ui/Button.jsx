export default function Button({ children }) {
  return (
    <button className="bg-secondaryColor text-primaryColor rounded-full p-4 hover:brightness-110 min-w-[140px]">
      {children}
    </button>
  );
}
