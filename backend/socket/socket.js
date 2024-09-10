import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"], // CHANGE THIS TO YOUR CLIENT URL IF YOU HAVING CORS ERROR
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {}; // EMPTY OBJECT TO STORE SOCKET ID OF ONLINE USERS

export const getReveivedUserSocket = (userId) => {
  return userSocketMap[userId];
};

// ON METHOD IS USE TO LISTEN TO EVENTS ON SERVER
io.on("connection", (socket) => {
  console.log("connection established", socket.id);

  const userId = socket.handshake.query.userId; // GET THE USER ID FROM THE CLIENT THAT WE SET IN OUR SocketContext.jsx

  // THIS WILL STORE THE SOCKET ID OF ONLINE USERS
  if (userId !== undefined) {
    userSocketMap[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); 
  }

  // ON DISCONNECT EVENT DELETE THE SOCKET ID OF ONLINE USERS
  socket.on("disconnect", () => {
    if (userId !== undefined) {
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
  });
});

export { app, server, io };
