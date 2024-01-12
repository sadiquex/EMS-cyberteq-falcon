import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    ghanaCardNumber: "",
    ssnitNumber: "",
    bankAccountNumber: "",
    alternatePhoneNumber: "",
    profilePicture: "",
  });

  const updateUserDetails = (data) => {
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      ...data,
    }));
  };

  return (
    <UserContext.Provider
      value={{ updateUserDetails, userDetails, setUserDetails }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
