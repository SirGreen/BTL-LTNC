const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Admin = new Schema({
  Account: { type: String, maxLength: 300, default: "admin", require: true },
  Password: { type: String, maxLength: 200, default: "admin", require: true },
  Income: {type: Number, default: 0}
});

module.exports = mongoose.model("admin", Admin);
