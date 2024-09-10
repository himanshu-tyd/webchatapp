import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./database/connect.js";
import authRouter from "./routes/authRoute.js";
import messsageRouter from "./routes/messageRoute.js";
import usersRouter from "./routes/usersRoute.js";
import { app, server } from "./socket/socket.js";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 8000;

// THE ORIGIN IS THE WEBSITE THAT IS MAKING REQUEST TO YOUR SERVER
const options = {
  origin: "http://localhost:3000",  //PUT HERE YOUR CLIENT URL
  credentials: true,    //REQUIRED FOR COOKIES, AUTHORIZATION HEADERS WITH HTTPS
};


// THIS GIVE US ROOT PATH OF OUR PROJECT
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors(options));
app.use("/api/auth", authRouter);
app.use("/api/messages", messsageRouter);
app.use("/api/users", usersRouter);


//EXPRESS STATIC MIDDLWARE TO SERVE STATIC FILES
app.use(express.static(path.join(__dirname, "/frontend/dist")));


//ANY REQUEST COMMING FROM THE CLIENT WILL BE REDIRECTED TO THE CLIENT DIST FOLDER
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
  connectDB();
  console.log(`SERVER IS RUNNING AT ${PORT} `);
});
