import User from "../models/userSchema.js";
import generateToken from "../utils/Token.js";
import bcrypt from "bcryptjs";

export const singUp = async (req, res) => {
  const { fullName, username, password, confirmPassword, image } = req.body;
  try {
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "password do not match" });
    }

    const user = await User.findOne({
      username: username,
    });

    if (user) {
      return res
        .status(409)
        .json({ success: false, message: "User name already taken." });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      username,
      password: hash,
      image,
    });

    if (newUser) {
      const saveUser = await newUser.save();

      //TODO: generate token

      generateToken(saveUser._id, res);

      res
        .status(201)
        .json({
          success: true,
          message: "Congratulations! Your account has been successfully created.",
          data: saveUser,
        });
    }
  } catch (e) {
    console.log("ERROR IN SINGUP ->", e);
    return res.status(500).json("INTERNAL SERVER ERROR -->", e);
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Account Not Found",
        });
    }

    const hashCompare = await bcrypt.compare(password, user.password);

    if (!hashCompare) {
      return res
        .status(400)
        .json({ success: false, message: "Your username or password is incorrect. Please try again." });
    }

    //TODO:generate token and set in cookie
    generateToken(user._id, res);

    res.status(200).json({ success: true, message: "Login Successful",data:user});

  } catch (e) {
    console.log("ERROR IN LOGIN ->", e);
    return res.status(500).json("INTERNAL SERVER ERROR -->", e);
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "",{ maxAge: 0 })
    res.status(200).json({ success: true, message: "Logged Out Successfully" });
  } catch (e) {
    console.log("ERROR IN LOGOUT ->", e);
    return res.status(500).json("INTERNAL SERVER ERROR -->", e);
  }
};
