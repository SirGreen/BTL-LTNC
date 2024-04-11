const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Admin = new Schema({
  Account: { type: String, maxLength: 300, default: "admin" },
  Password: { type: String, maxLength: 200, default: "admin" },
});

module.exports = mongoose.model("admin", Admin);
