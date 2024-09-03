import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized No Token " });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized Invalid Token " });
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User is missing" });
    }

    req.user = user;
    
    next();

    return true

  } catch (e) {
    console.log("ERROR IN PROTECT ROUTE ->", e);
    return res.status(500).json("INTERNAL SERVER ERROR -->", e);
  }

};

export default protectRoute;
