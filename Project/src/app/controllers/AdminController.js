const Driver = require("../models/Driver");
const Journey = require("../models/Journey");
const Admin = require("../models/Admin");
const { Mongoose } = require("mongoose");
const bcrypt = require("bcrypt");

function CalDisAndPrice(kilo) {
  return kilo * 5000;
}

class AdminController {
  index(req, res) {
    //res.render('admin')
    res.send("ADMIN PAGE");
  }

  //[POST] /addVehicle
  AddNewVehicle() {}

  //[POST] /addDriver
  async AddDriver(req, res, next) {
    const { Name, PhoneNumber, Account, Password } = req.body;
    const hashedPassword = await bcrypt.hash(Password, 10);
    const driver = new Driver({
      Name: Name,
      PhoneNumber: PhoneNumber,
      Account: Account,
      Password: hashedPassword,
    });
    driver.save();
    res.send("AddDriver");
  }

  //[POST] /addJourney
  AddJourney(req, res, next) {
    const data = req.body;
    data.Kilomet = 10;
    data.Price = CalDisAndPrice(data.Kilomet);
    //find driver and car
    //add to database
    const journey = new Journey(data);
    journey.save();

    res.send("AddJourney");
  }

  UpdateVehicleInfo() {}

  async GetAdmin(Acc) {
    return Admin.find({ Account: Acc }).then((admin) => admin);
  }

  async AddAdmin(req, res) {
    const {Account, Password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(Password, 10);
      const admin = new Admin({ Account: Account, Password: hashedPassword });
      admin.save();
      res.send(`Added ${Account}`)
    } catch {}
  }
}

let admin = Object.freeze(new AdminController());

//singleton
module.exports = admin;
