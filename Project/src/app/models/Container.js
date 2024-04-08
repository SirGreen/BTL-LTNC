const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Transportation = require('./Transportation')

const Container = Transportation.discriminator('Container', new Schema({}));
module.exports = mongoose.model("Container", Container);