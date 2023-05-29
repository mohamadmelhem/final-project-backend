import { Schema, model } from "mongoose";

const BookingSchema = new Schema(
  {
    idHouses: {
      type: Schema.Types.ObjectId,
      ref: "HousesModel",
      required: [true, "Please enter the user"],
    },
    
    name: {
      type: String,
      required: [true, "Please enter the price"],
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
      phone: {
        type: String,
        required: [true, "please enter your phone number"],
        unique: [true, "A user is already registered with this phone number"],
        trim: true,
        match: [/^[0-9]*$/, "Please fill a valid phone number"],
      },
      date: {
        type: Date,
        required: [true, "Please enter your date"],
      },
  },
  {
    collection: "Booking",
    timestamps: true,
  }
);

BookingSchema.pre("find", function (next) {
  this.populate("idHouses");
  next();
});

const BookingModel = model("Booking", BookingSchema);

export default BookingModel;
