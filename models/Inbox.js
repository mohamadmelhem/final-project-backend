import mongoose from "mongoose";
const { Schema, model } = mongoose;

const inboxschema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "Please enter your first name"],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "Please enter your last name"],
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
    feedback: {
      type: String,
      trim: true,
      required: [true, "Please enter your feedback"],
    },
  },
  {
    collection: "Inbox",
  }
);
const Model = model("Inbox", inboxschema);
export default Model;
