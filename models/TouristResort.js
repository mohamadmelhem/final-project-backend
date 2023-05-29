import mongoose from "mongoose";

const { Schema, model } = mongoose;

const TouristResortSchema = Schema(
  {
    location: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Please enter the location"],
    },
    description: {
      type: String,
      trim: true,
      minLength: [3, "the description is too short!"],
    },
    idUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    isStatus: {
      type: Boolean,
      default:false ,
    },
  },
  {
    collection: "TouristResort",
  }
);
TouristResortSchema.pre(["find", "findOne"], function () {
  this.populate(["idUser"]);
});
const TouristResortModel = model("TouristResortModel", TouristResortSchema);
export default TouristResortModel;