import mongoose, { Schema, model } from "mongoose";

const adminSchema = Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter your first name"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Please enter your last name"],
      trim: true,
    },
    userName: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Please enter your username"],
      minLength: [6, "the userame is too short!"],
      maxLength: [25, "the userame is too long!"],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Please enter your mail"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [8, "the password is too short!"],
      maxLength: [80, "the password is too long!"],
    },
  },
  {
    collection: "Admin",
  }
);

const Model = model("Admin", adminSchema);
export default Model;
