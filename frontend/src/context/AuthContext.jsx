/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import React from "react";



//FUNCTION TO USE CONTEXT IN APP THAT WILL RETURN THE CONTEXT DATA
export const useAuthContext = () => {
  return React.useContext(AuthContext);
};

export const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  const initialState = JSON.parse(localStorage.getItem("logged-user") || null);

  const [user, setUser] = React.useState(initialState);
  let context = {
    user,
    setUser,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
