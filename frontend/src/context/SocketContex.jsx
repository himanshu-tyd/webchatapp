import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { BASE_URL } from "../lib/config.js";
import io from "socket.io-client";

export const SocketContext = createContext();


//FUNCTION TO USE SOCKET CONTEXT ANT THIS WILL RETURN THE CONTEXT DATA
export const useSocketContext = () => {
  return useContext(SocketContext);
};

console.log(BASE_URL);

export const SocketContextProvider = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState([]); 
  const [socket, setSocket] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      const socketInstance = io("http://localhost:8000" , {
        query: {userId: user._id,},  // WE ARE SENDING THE USER ID TO THE SERVER SO WE CAN KEEP TRACK OF ONLINE USERS
      });

      //LISTENING FOR ONLINE USERS EVENT CREATE IN /backend/socket/socket.js
      socketInstance.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      setSocket(socketInstance); 

      return () => socketInstance.close();  // IF THE COMPONENT UNMOUNTS THEN CLOSE THE SOCKET 
    } 
      if (socket) {
        socket.close();
        setSocket(null);
    }
  }, [user]);

  const context = { 
    socket,
    onlineUsers, // USE THIS TO GET THE ONLINE USERS
  };

  return (
    <SocketContext.Provider value={context}>{children}</SocketContext.Provider>
  );
};
