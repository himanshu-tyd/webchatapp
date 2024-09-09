import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./database/connect.js";
import authRouter from "./routes/authRoute.js";
import messsageRouter from "./routes/messageRoute.js";
import usersRouter from "./routes/usersRoute.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

const options = {
  origin: "http://localhost:3000",
  credentials: true,
};

//TODO:MIDDLWARES

app.use(express.json()); //TODO: To parse the incoming request with JSON payloads from (req.body)
app.use(cookieParser()); // TODO: TO access the cookie
app.use(cors(options));
app.use("/api/auth", authRouter);
app.use("/api/messages", messsageRouter);
app.use("/api/users", usersRouter);

server.listen(8000, () => {
  connectDB();
  console.log(`SERVER IS RUNNING AT ${PORT} `);
});
