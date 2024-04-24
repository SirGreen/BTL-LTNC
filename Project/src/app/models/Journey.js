const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Driver = require("./Driver");

const Journey = new Schema({
  Transportation: { type: Schema.Types.ObjectId, ref: "Car", default: null },
  TransportationType: {
    type: String,
    enum: ["car", "truck", "coach"],
    default: "car",
  },
  Driver: { type: Schema.Types.ObjectId, ref: "Driver", default: null },
  Kilomet: { type: Number },
  Price: { type: Number },
  DateTime: { type: Date, default: Date.now() },
  StartLocation: { type: String, require: true },
  EndLocation: { type: String, require: true },
  Status: { type: Number, default: 0 }, /// 0:chua di, 1: dang di, 2: xong
  Time: {type: Number, default: 0}
});

module.exports = mongoose.model("Journey", Journey);
