const mongoose = require("mongoose")
const Schema = mongoose.Schema


const Car = new Schema({
    Capacity: {type: Number, default: 4},
    Size: {type: Number, default: 7},
    TypeOfFuel: {type: String, default: "Petrol"},
    VehicleStatus: {
        type: String,
        enum: ["Active","UnderMaintainance","NotActive"],
        default: "NotActive"
    },
    Warranty: {type: Schema.Types.ObjectId, ref: "WarrantyService"},
    Journey: {type: Schema.Types.ObjectId, ref: "Journey", default: null},
    License: {type: String, default:"113"}
});

module.exports = mongoose.model("Car", Car);
