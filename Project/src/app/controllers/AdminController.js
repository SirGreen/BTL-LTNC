const Driver = require("../models/Driver");
const Journey = require("../models/Journey");
const Admin = require("../models/Admin");
const { Mongoose } = require("mongoose");
const bcrypt = require('bcrypt')

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
  AddNewDriver(req, res, next) {
    const driver = new Driver({
      Name: "Test",
      PhoneNumber: "00000000",
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
    return Admin.find({Account: Acc}).then(admin => admin)
  }

  async AddAdmin(Acc,Pass){
    try {
      const hashedPassword = await bcrypt.hash(Pass,10)      
      const admin = new Admin({Account:Acc,Password:hashedPassword})
      return admin.save()
    } catch {}
    
  }
}

let admin = Object.freeze(new AdminController());

//singleton
module.exports = admin;
