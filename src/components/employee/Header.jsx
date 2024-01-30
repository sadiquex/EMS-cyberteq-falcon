import { IoMdNotifications } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Header() {
  const userName = useSelector((state) => state.user?.userDetails?.name);

  return (
    <nav className="z-50 w-full fixed bg-primaryColor text-secondaryColor shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          {/* left side */}
          <div className="flex items-center justify-start rtl:justify-end gap-4">
            <span className="h-8 rounded-full flex items-center justify-center ">
              <img
                src="https://media.licdn.com/dms/image/C4E0BAQFFXWSJ5DNoig/company-logo_200_200/0/1630616766212/cyberteq_logo?e=2147483647&v=beta&t=zZXYshTGK5ExNsTktGfnn9LoPIgTiUcfPtSb7YeX_DE"
                className="h-20 object-cover rounded-full"
                alt="Cyberteq Falcon Logo"
              />
            </span>
            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap">
              hey, {userName}
            </span>
          </div>
          {/* right side */}
          <span className=" flex gap-2">
            <IoMdNotifications size={24} />
            <FaUserCircle size={24} />
          </span>
        </div>
      </div>
    </nav>
  );
}
