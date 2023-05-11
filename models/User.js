import mongoose from "mongoose";
const { Schema, model } = mongoose;

const user = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name cann't be empty"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name cann't be empty"],
      trim: true,
    },
    userName: {
        type: String,
        required: [true, "User Name cann't be empty"],
        trim: true,
      },
    email: {
      type: String,
      trim: true,
      required: [true, "Email cann't be empty"],
      unique: [true, "A user is already registered with this email"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: function () {
        return this.isMember === true;
      },
      minLength: [8, "the password is too short!"],
      maxLength: [80, "the password is too long!"],
    },
    phone: {
      type: String,
      required: [true, "please enter your phone number"],
      unique: [true, "A user is already registered with this phone number"],
      trim: true,
      match: [/^[0-9]*$/, "Please fill a valid phone number"],
    },
    preferredDestinations: [{ type: String }],
    preferredAirlines: [{ type: String }],
  },
  {
    collection: "User",
  }
);

/**
 * @description Data model for users account
 */
const User = model("User", user);
export default User;
