import User from "../models/userSchema.js";
import generateToken from "../utils/Token.js";
import bcrypt from "bcryptjs";

//SINGUP

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

      //TODO: GENERATED TOKEN WHEN USER IS CREATED ANS SET COOKIES IN BROWSER

      generateToken(saveUser._id, res);

      res.status(201).json({
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

//LOGIN

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Account Not Found",
      });
    }

    const hashCompare = await bcrypt.compare(password, user.password);

    if (!hashCompare) {
      return res.status(400).json({
        success: false,
        message: "Your username or password is incorrect. Please try again.",
      });
    }

    //TODO: GENERATED TOKEN WHEN USER IS CREATED AND SET COOKIES IN BROWSER

    generateToken(user._id, res);

    res
      .status(200)
      .json({ success: true, message: "Login Successful", data: user });
  } catch (e) {
    console.log("ERROR IN LOGIN ->", e);
    return res.status(500).json("INTERNAL SERVER ERROR -->", e);
  }
};

//LOGOUT

export const logout = async (req, res) => {
  try {

    //CALLING FUNCTION IN LOGOUT FUNCTION TO UPDATE USER LAST LOGOUT TIME
    update(req);

    res.cookie("jwt", "", { maxAge: 0 });

    res.status(200).json({ success: true, message: "Logged Out Successfully" });
  } catch (e) {
    console.log("ERROR IN LOGOUT ->", e);
    return res.status(500).json("INTERNAL SERVER ERROR -->", e);
  }
};

// TODO: THIS IS THE FUNCTION THAT UPDATE USER LAST LOGOUT TIME IN DATABASE DO WE CAN SHOW LAST STATUS OF THE USER IN DASHBOARD

const update = async (req) => {
  const user = req.user._id;

  try {
    await User.findByIdAndUpdate(
      user,
      {
        updatedAt: new Date(),
      },
      {
        new: true,
      }
    );
  } catch (e) {
    console.log("ERROR IN UPDATE ->", e);
  }
};
