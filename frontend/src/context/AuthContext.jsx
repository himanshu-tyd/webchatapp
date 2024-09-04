import React from "react";

export const useAuthContext = () => {
  return React.useContext(AuthContext);
};

export const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  const initialState = JSON.parse(localStorage.getItem("logged-user") || null);

  const [user, setUser] = React.useState(initialState);
  console.log('auth user ',user);
  let context = {
    user,
    setUser,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};


