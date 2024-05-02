const mongoose = require("mongoose");
const Schema = mongoose.Schema;

function threeMonthFromNow() {
  let d = new Date();
  d.setMonth(d.getMonth() + 3);
  return d;
}

const Coach = new Schema({
  Brand: {
    type: String,
    enum: ["SUZUKI XL7", "SUZUKI SWIFT", "SUZUKI CIAZ", "MERCEDES", "FERRARI"],
    default: "SUZUKI XL7"
  },
  Capacity: { type: Number, default: 4 },
  Size: { type: Number, default: 7 },
  TypeOfFuel: { type: String, default: "Petrol" },
  VehicleStatus: {
    type: String,
    enum: ["Active", "UnderMaintainance", "NotActive"],
    default: "NotActive",
  },
  WarrantyTime : {type: Date, default: threeMonthFromNow},
  WarrantyHis : [Date],
  Journey: { type: Schema.Types.ObjectId, ref: "Journey", default: null },
  License: { type: String, default: "113" },
});

module.exports = mongoose.model("Coach", Coach);
