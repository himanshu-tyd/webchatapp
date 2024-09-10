import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";


//TODO: THIS IS THE MIDDLEWARE FUNCTION THAT WILL CHECK IF THE USER IS LOGGED AND SET THE USER DATA IN THE REQUEST OBJECT

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;  //ACCESSING THE TOKEN FROM THE COOKIES

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized No Token " });
    }

    // WE ARE VERIFYING THE TOKEN WITH THE SECRET KEY THAT  WILL RETURN OBJECT ALONG WITH USER ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  


    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized Invalid Token " });
    }

    // FINDING THE USER BY THE USER ID THAT WE GET FROM THE DECODED TOKEN
    const user = await User.findById(decoded.userId);  

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User is missing" });
    }

    // SETTING THE USER DATA IN THE REQUEST OBJECT SO WE CAN USE IT IN OUR ROUTES
    req.user = user;

    // CALLING THE NEXT MIDDLEWARE FUNCTION
    next();

    return true;
  } catch (e) {
    console.log("ERROR IN PROTECT ROUTE ->", e);
    return res.status(500).json("INTERNAL SERVER ERROR -->", e);
  }
};

export default protectRoute;
