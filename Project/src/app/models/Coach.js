const mongoose = require("mongoose")
const Schema = mongoose.Schema


const Coach = new Schema({
    Capacity: {type: Number, default: 50},
    Size: {type: Number, default: 117},
    TypeOfFuel: {type: String, default: "Petrol"},
    VehicleStatus: {
        type: String,
        enum: ["Active","UnderMaintainance","NotActive"],
        default: "NotActive"
    },
    Warranty: {type: Schema.Types.ObjectId, ref: "WarrantyService"},
    Journey: {type: Schema.Types.ObjectId, ref: "Journey", default: null},
});

module.exports = mongoose.model("Coach", Coach);
