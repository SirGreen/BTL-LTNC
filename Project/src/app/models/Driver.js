const mongoose = require("mongoose");
const Journey = require("./Journey");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Driver = new Schema({
  Name: { type: String, maxLength: 255, require: true },
  PhoneNumber: { type: String, maxLength: 100, require: true },
  Address: { type: String, maxLength: 600 },
  DrivingExperience: {
    type: Number,
    enum: [1, 2, 3],
    default: 1,
  },
  LiscenceNumber: { type: String, maxLength: 20 },
  JourneyList: [{ type: Schema.Types.ObjectId, ref: "Journey" }],
  Account: { type: String, maxLength: 300, default: "driverAcc" },
  Password: { type: String, maxLength: 200, default: "123456" },
});

module.exports = mongoose.model("Driver", Driver);