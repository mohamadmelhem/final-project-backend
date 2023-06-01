import { Schema, model } from "mongoose";

const housesSchema = new Schema(
    {
        space: {
            type: String,
            required: true,
        },
        images: {
            type: [String],
            required: true,
            //ref:"Image"
        },
        description: {
            type: String,
            required: true,
        },
        pricePerNight: {
            type: String,
        },
        isStatus: {
            type: Boolean,
            default: true,
        },
        idTouristResort: {
            type: Schema.Types.ObjectId,
            ref: "TouristResortModel",
            required: [true, "Please enter the Tourist Resort"],
          },
    },

    { collection: "Houses" }
);
housesSchema.pre(["find", "findOne"], function () {
    this.populate([ "idTouristResort"]);
});
const HousesModel = model("HousesModel", housesSchema);
export default HousesModel;