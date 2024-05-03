const mongoose = require("mongoose");
const Schema = mongoose.Schema;

function threeMonthFromNow() {
  let d = new Date();
  d.setMonth(d.getMonth() + 3);
  return d;
}

const Truck = new Schema({
  Brand: {
    type: String,
    enum: ["VAN DONGBEN", "VAN KENBO", "VAN FOTON", "VAN SUZUKI BLIND"],
    default: "VAN DONGBEN"
  },
  Capacity: { type: Number, default: 4 },
  Size: { type: Number, default: 7 },
  TypeOfFuel: { type: String, default: "Petrol" },
  VehicleStatus: {
    type: String,
    enum: ["Active", "UnderMaintainance", "NotActive"],
    default: "NotActive",
  },
  WarrantyTime: { type: Date, default: threeMonthFromNow },
  WarrantyHis: [Date],
  Journey: { type: Schema.Types.ObjectId, ref: "Journey", default: null },
  License: { type: String, default: "113" },
});

module.exports = mongoose.model("Truck", Truck);
