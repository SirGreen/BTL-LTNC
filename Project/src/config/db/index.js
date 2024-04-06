const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://5anhemsieunhan:ltnc12345@cluster0.c26svbl.mongodb.net/BTL"
    );
    console.log("Connect successfully");
  } catch (error) {
    console.log("Fail to connect");
  }
}

module.exports = { connect };
