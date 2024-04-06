const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Driver = require("./Driver");

const Journey = new Schema({
  Transportation: { type: String, enum: ["car", "truck", "coach"] },
  Driver: [{ type: Schema.Types.ObjectId, ref: "Driver" }],
  Kilomet: { type: Number },
  Price: { type: Number },
  DateTime: { type: Date, default: Date.now() },
  StartLocation: { type: String },
  Endlocation: { type: String },
  Status: { type: Boolean, default: 0 },
});

module.exports = mongoose.model("Journey", Journey);
