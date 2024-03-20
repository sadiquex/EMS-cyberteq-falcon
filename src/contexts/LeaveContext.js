// context for ui functionality
import { createContext, useContext, useState } from "react";

const LeaveContext = createContext();

export const LeaveProvider = ({ children }) => {
  const [isAddingLeave, setIsAddingLeave] = useState(false);
  const [appliedLeaves, setAppliedLeaves] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addLeaveHandler = () => {
    setIsAddingLeave(!isAddingLeave);
  };

  const modalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <LeaveContext.Provider
      value={{
        isAddingLeave,
        setIsAddingLeave,
        addLeaveHandler,
        appliedLeaves,
        setAppliedLeaves,
        modalHandler,
        isModalOpen,
        setIsModalOpen,
      }}
    >
      {children}
    </LeaveContext.Provider>
  );
};

export const useLeaveContext = () => {
  return useContext(LeaveContext);
};
