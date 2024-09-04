import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: [true, "username is required"],
      unique: [true, "username should be unique"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    image: {
      type: String,
      default: [""],
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
