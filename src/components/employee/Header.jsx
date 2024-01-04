export default function Header() {
  return (
    <nav className="z-50 h-10 w-full fixed bg-primaryColor ">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <img
              //   src="https://flowbite.com/docs/images/logo.svg"
              className="h-8 me-3"
              alt="Logo"
            />
            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
              hey, user
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
