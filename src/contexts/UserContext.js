import { createContext, useState, useEffect } from "react";
import axios from "../api/axios";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  //   useEffect(() => {
  //     if (!user) {
  //       axios.get("/Users/login").then((response) => {
  //         setUser(response.data);
  //         setReady(true);
  //       });
  //     }
  //   }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
};
