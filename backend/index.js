import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./database/connect.js";
import authRouter from "./routes/authRoute.js";
import messsageRouter from "./routes/messageRoute.js";
import usersRouter from "./routes/usersRoute.js";
import { app, server } from "./socket/socket.js";
import path from "path"

dotenv.config();

const PORT = process.env.PORT || 8000;

const options = {
  origin: "http://localhost:3000",
  credentials: true,
};

const __dirname=path.resolve() //TODO: To get the path of the current file

//TODO:MIDDLWARES

app.use(express.json()); //TODO: To parse the incoming request with JSON payloads from (req.body)
app.use(cookieParser()); // TODO: TO access the cookie
app.use(cors(options));
app.use("/api/auth", authRouter);
app.use("/api/messages", messsageRouter);
app.use("/api/users", usersRouter);

app.use(express.static(path.join(__dirname, '/frontend/dist')))  //TODO: To serve static files

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname, 'frontend','dist','index.html'))  //TODO: send to file using backend
})

server.listen(8000, () => {
  connectDB();
  console.log(`SERVER IS RUNNING AT ${PORT} `);
});
