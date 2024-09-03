import mongoose, { connect } from "mongoose";

const connectDB = async () => {
  const URI = process.env.MONGO_URI;
  try {
   const db= await mongoose.connect(URI, {
      dbName: "web-chat-app",
    });

    if(db){
        console.log("DATABASE CONENCTED")
    }
  } catch (e) {
    console.log("ERROR IN SINGUP ->", e);
    return res.status(500).json("INTERNAL SERVER ERROR -->", e);
  }
};

export default connectDB;
