const mongoose = require("mongoose")
const Schema = mongoose.Schema


const Transportation = new Schema({
    Capacity: {type: Number},
    Size: {type: Number},
    TypeOfFuel: {type: String},
    VehicleStatus: {
        type: String,
        enum: ["Active","UnderMaintainance","NotActive"],
        default: "Active"
    },
    Warranty: {type: Schema.Types.ObjectId, ref: "WarrantyService"},
    Journey: {type: Schema.Types.ObjectId, ref: "Journey"},
});

module.exports = mongoose.model("Transportation", Transportation);
