import mongoose from "mongoose";

const { Schema, model } = mongoose;

const TouristResortSchema = Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please enter the name"],
    },
    rating: {
      type: Number,
      min: 1, // minimum value
      max: 5, // maximum value
      required: true // make it required or remove this line if optional
    },
  
    location: {
      type: String,
      // unique: true,
      trim: true,
      required: [true, "Please enter the location"],
    },
    description: {
      type: String,
      trim: true,
      minLength: [3, "the description is too short!"],
    },
    images: {
      type: String,
      required: true,
      //ref:"Image"
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