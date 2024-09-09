import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { BASE_URL } from "../lib/config.js";
import io from "socket.io-client";

export const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const { user } = useAuthContext();
  useEffect(() => {
    if (user) {
      const socketInstance = io(BASE_URL, {
        query: {userId: user._id,},
      });

      socketInstance.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      setSocket(socketInstance);

      return () => socketInstance.close();
    } 
      if (socket) {
        socket.close();
        setSocket(null);
    }
  }, [user]);

  const context = { 
    socket,
    onlineUsers,
  };

  return (
    <SocketContext.Provider value={context}>{children}</SocketContext.Provider>
  );
};
