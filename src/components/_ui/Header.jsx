import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../../redux/features/UserSlice";
import { CiLogout } from "react-icons/ci";
import useUserData from "../../hooks/useUserData";
import { Spinner } from "./Spinner";

export default function Header() {
  const dispatch = useDispatch();

  const { id, role } = useSelector((state) => state.user?.userDetails);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { userData, userDataLoading, userDataError } = useUserData(id);

  const { profileImageUrl, name } = userData || {};

  const modalHandler = () => {
    setModalIsOpen(!modalIsOpen);
  };

  // go to profile page according to role
  const getProfileLink = () => {
    switch (role) {
      case "manager":
        return "/manager/profile";
      case "user":
        return "/employee/profile";
      case "admin":
        return "/admin/profile";
      default:
        return "/";
    }
  };

  return (
    <nav className="z-50 w-full fixed mt-2 bg-primaryColor rounded-2xl">
      <div className="px-4">
        <div className="flex items-center justify-between py-4">
          {/* left side */}
          <div className="flex items-center gap-2">
            {/* logo */}
            <span className="h-8 rounded-full flex items-center justify-center">
              <img
                src="https://media.licdn.com/dms/image/C4E0BAQFFXWSJ5DNoig/company-logo_200_200/0/1630616766212/cyberteq_logo?e=2147483647&v=beta&t=zZXYshTGK5ExNsTktGfnn9LoPIgTiUcfPtSb7YeX_DE"
                className="w-12 h-12 rounded-full object-cover object-top"
                alt="Cyberteq Falcon Logo"
              />
            </span>
            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-secondaryColor">
              Hey, {name?.split(" ")[0]}
            </span>
          </div>
          {/* right side */}
          <span className="text-secondaryColor flex gap-2 relative cursor-pointer">
            <IoMdNotifications size={30} />
            <span className="h-8 rounded-full">
              <span
                className="h-8 rounded-full flex items-center justify-center"
                onClick={modalHandler}
              >
                {userDataLoading ? (
                  <Spinner />
                ) : (
                  <img
                    src={profileImageUrl}
                    className="w-12 h-12 rounded-full object-cover object-top"
                    alt={name}
                  />
                )}
              </span>
            </span>

            {/* modal */}
            {modalIsOpen && (
              <ul className="absolute right-[40%] top-[100%] py-2 text-sm w-44  bg-gray-700 divide-y text-white rounded-md shadow text-center">
                <li className="cursor-pointer hover:bg-gray-600 w-full py-2">
                  <Link
                    to={getProfileLink()}
                    className="flex justify-center items-center gap-1"
                  >
                    <FaUserCircle />
                    Profile
                  </Link>
                </li>
                <li className="cursor-pointer hover:bg-gray-600 w-full py-2">
                  <Link
                    className="flex justify-center items-center gap-1"
                    onClick={() => dispatch(logOut())}
                  >
                    <CiLogout />
                    Log out
                  </Link>
                </li>
              </ul>
            )}
          </span>
        </div>
      </div>
    </nav>
  );
}
