import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {};

export const getReveivedUserSocket = (userId) =>{ return userSocketMap[userId]};

io.on("connection", (socket) => {

    console.log('connection established', socket.id);

  const userId = socket.handshake.query.userId;

  if (userId !== undefined) {
    userSocketMap[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  }

  socket.on("disconnect", () => {
    if (userId !== undefined) {
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
  });
});

export { app, server, io };

