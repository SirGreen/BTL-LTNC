const Driver = require("../models/Driver");
const Journey = require("../models/Journey");
const Admin = require("../models/Admin");
const { Mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const Car = require("../models/Car");
const Coach = require("../models/Coach");
const Truck = require("../models/Truck");
const ObjectId = require("mongodb").ObjectId;

function threeMonthFromNow() {
  let d = new Date();
  d.setMonth(d.getMonth() + 3);
  return d;
}

function CalPrice(kilo) {
  return kilo * 12500;
}

class AdminController {
  index(req, res) {
    //res.render('admin')
    res.render("admin.ejs");
  }

  // [GET] /checkIncome
  async CheckIncome(req, res) {
    var adm = await Admin.findOne({ Account: "admin" });
    var income = adm.Income;
    console.log(income);
    res.send(`Income ${income}`);
  }

  async FindJourneyForDriver(driver) {
    var journey = null;
    var journeyType = "car";
    switch (driver.DrivingExperience) {
      case 2: // Truck
        journeyType = "truck";
        break;
      case 3: // Coach
        journeyType = "coach";
        break;
    }
    journey = await Journey.findOne({
      Driver: null,
      TransportationType: journeyType,
      Status: 0,
    });
    if (journey == null) {
      console.log("Cannot find suitable Journey");
      return;
    }
    journey.Driver = driver;
    if (journey.Driver != null && journey.Transportation != null)
      journey.Status = 1;
    await journey.save();
    driver.JourneyIncharge = journey;
    await driver.save();
  }

  async FindJourneyForTransportation(transportation, TransportationType) {
    var journey = null;
    journey = await Journey.findOne({
      Transportation: null,
      TransportationType: TransportationType,
      Status: 0,
    });
    if (journey == null) {
      console.log("Cannot find suitable Journey");
      return;
    }
    journey.Transportation = transportation;
    if (journey.Driver != null && journey.Transportation != null)
      journey.Status = 1;
    await journey.save();
    transportation.Journey = journey;
    transportation.VehicleStatus = "Active";
    await transportation.save();
  }

  //[POST] /addTransportation
  async AddNewTransportation(req, res, next) {
    try {
      //Factory Pattern
      const data = req.body;
      //req.body.TransportationType = "truck"
      let redirTo = "/car_admin";
      const { transportationType } = req.params;
      switch (transportationType) {
        case "truck":
          // code block
          console.log(data);
          const truck = new Truck(data);
          await admin.FindJourneyForTransportation(truck, "truck");
          await truck.save();
          redirTo = "/truck_admin";
          break;
        case "coach":
          // code block
          const coach = new Coach(data);
          await admin.FindJourneyForTransportation(coach, "coach");
          await coach.save();
          redirTo = "/coach_admin";
          break;
        default:
          const car = new Car(data);
          await admin.FindJourneyForTransportation(car, "car");
          await car.save();
        // code block
      }
      res.redirect(redirTo);
    } catch (error) {
      res.send(error);
    }
  }

  //[POST] /addDriver
  async AddNewDriver(req, res, next) {
    try {
      const {
        Name,
        PhoneNumber,
        Account,
        Password,
        DrivingExperience,
        LiscenceNumber,
      } = req.body;
      const hashedPassword = await bcrypt.hash(Password, 10);
      const driver = new Driver({
        Name: Name,
        PhoneNumber: PhoneNumber,
        LiscenceNumber: LiscenceNumber,
        DrivingExperience: DrivingExperience,
        Account: Account,
        Password: hashedPassword,
      });
      await admin.FindJourneyForDriver(driver);
      await driver.save();
    } catch (error) {
      return res.send("ERROR");
    }
    let information = "Added successfully!";
    information = JSON.stringify(information);
    res.redirect(`/driver_admin?info=${information}`);
  }

  async FindDriver(journey) {
    try {
      if (journey.Driver != null) return;
      var driver = null;
      var level = 1; //Car
      switch (journey.TransportationType) {
        case "truck": // Truck
          level = 2;
          break;
        case "coach": // Coach
          level = 3;
          break;
      }
      driver = await Driver.findOne({
        JourneyIncharge: null,
        DrivingExperience: { $gte: level },
      });
      if (driver == null) {
        console.log("Cannot find suitable Driver");
        return;
      }
      driver.JourneyIncharge = journey;
      await driver.save();
      journey.Driver = driver;
      if (journey.Driver != null && journey.Transportation != null)
        journey.Status = 1;
      await journey.save();
    } catch (error) {
      res.send("Error!!!");
    }
  }
  ////////////////////////////////////
  async FindUnderMaintainanceTransportation(TransportationType) {
    var transportation = null;
    switch (TransportationType) {
      case "truck":
        // Truck
        transportation = await Truck.findOne({ Journey: null });
        break;
      case "coach":
        // Coach
        transportation = await Coach.findOne({ Journey: null });
        break;
      default:
        // Car
        transportation = await Car.findOne({ Journey: null });
        break;
    }
    if (
      transportation != null &&
      transportation.VehicleStatus == "UnderMaintainance"
    ) {
      transportation.VehicleStatus = "Active";
      await transportation.save();
      return transportation;
    }
    return transportation;
  }

  async FindTransportation(journey) {
    if (journey.Transportation != null) return;
    var transportation = null;
    switch (journey.TransportationType) {
      case "truck":
        // Truck
        transportation = await Truck.findOne({
          Journey: null,
          VehicleStatus: "NotActive",
        });
        break;
      case "coach":
        // Coach
        transportation = await Coach.findOne({
          Journey: null,
          VehicleStatus: "NotActive",
        });
        break;
      default:
        // Car
        transportation = await Car.findOne({
          Journey: null,
          VehicleStatus: "NotActive",
        });
        break;
    }

    if (transportation == null)
      transportation = await admin.FindUnderMaintainanceTransportation(
        journey.TransportationType
      );

    if (transportation == null) {
      console.log("Cannot find suitable Transportation");
      return;
    }
    transportation.VehicleStatus = "Active";
    transportation.Journey = journey;
    await transportation.save();
    journey.Transportation = transportation;
    if (journey.Driver != null && journey.Transportation != null)
      journey.Status = 1;
    await journey.save();
  }

  //[POST] /addJourney
  async AddJourney(req, res, next) {
    try {
      const data = req.body;
      data.Price = CalPrice(data.Kilomet);
      const journey = new Journey(data);

      await admin.FindDriver(journey);
      await admin.FindTransportation(journey);
      if (journey.Driver != null && journey.Transportation != null)
        journey.Status = 1;
      await journey.save();
      res.send("AddJourney");
    } catch (error) {
      res.send("ERROR");
    }
  }
  //////////// UPDATE ////////////////////

  async UpdateDriver(req, res) {
    try {
      if (!ObjectId.isValid(req.params.id)) {
        res.send("Invalid driver ID");
        return;
      }
      var d = null;
      d = await Driver.findOne({ _id: req.params.id });
      if (d == null) {
        res.send("No driver with that ID");
        return;
      }
      Driver.updateOne({ _id: req.params.id }, req.body).then(() =>
        res.redirect("/driver_admin")
      );
    } catch (error) {
      res.status(500).json({ err: "ERROR" });
    }
  }

  async UpdateCar(req, res) {
    try {
      if (!ObjectId.isValid(req.params.id)) {
        res.send("Invalid car ID");
        return;
      }
      var d = null;
      d = await Car.findOne({ _id: req.params.id });
      if (d == null) {
        res.send("No car with that ID");
        return;
      }
      Car.updateOne({ _id: req.params.id }, req.body).then(() =>
        res.redirect("/car_admin")
      );
    } catch (error) {
      res.status(500).json({ err: "ERROR" });
    }
  }

  async UpdateTruck(req, res) {
    try {
      if (!ObjectId.isValid(req.params.id)) {
        res.send("Invalid truck ID");
        return;
      }
      var d = null;
      d = await Truck.findOne({ _id: req.params.id });
      if (d == null) {
        res.send("No truck with that ID");
        return;
      }
      Truck.updateOne({ _id: req.params.id }, req.body).then(() =>
        res.redirect("/truck_admin")
      );
    } catch (error) {
      res.status(500).json({ err: "ERROR" });
    }
  }

  async UpdateCoach(req, res) {
    try {
      if (!ObjectId.isValid(req.params.id)) {
        res.send("Invalid coach ID");
        return;
      }
      var d = null;
      d = await Coach.findOne({ _id: req.params.id });
      if (d == null) {
        res.send("No coach with that ID");
        return;
      }
      Coach.updateOne({ _id: req.params.id }, req.body).then(() =>
        res.redirect("/coach_admin")
      );
    } catch (error) {
      res.status(500).json({ err: "ERROR" });
    }
  }
  /////////////////////Warranty/////////////////////
  async CheckForWarranty(transportation) {
    try {
      var date1 = transportation.WarrantyTime.getTime();
      var date2 = Date.now();
      console.log(date1);
      console.log(date2);
      if (date1 <= date2) {
        transportation.VehicleStatus = "UnderMaintainance";
        await transportation.save();
        transportation.WarrantyHis.push(transportation.WarrantyTime);
        transportation.WarrantyTime = threeMonthFromNow();
        await transportation.save();
        return 0; //maintain
      }
      return 1; //normal
    } catch (error) {
      console.log(error);
    }
  }

  async GetAdmin(Acc) {
    return await Admin.find({ Account: Acc }).then((admin) => admin);
  }

  async GetAdminById(id) {
    return await Admin.find({ _id: id }).then((admin) => admin);
  }

  async AddAdmin(Account, Password) {
    try {
      const hashedPassword = await bcrypt.hash(Password, 10);
      const adm = new Admin({ Account: Account, Password: hashedPassword });
      adm.save();
      console.log(`Added ${Account}`);
    } catch (e) {
      console.log(e);
    }
  }

  //[DELETE] /deleteDriver/:id
  async DeleteDriver(req, res, next) {
    try {
      const id = req.params.id;
      const driver = await Driver.findOne({ _id: id });
      if (driver == null) {
        console.log("Cannot find driver");
        return;
      }
      if (driver.JourneyIncharge != null) {
        var journey = null;
        journey = await Journey.findOne({ _id: driver.JourneyIncharge._id });
        if (journey == null) {
          console.log("Journey is not valid");
          return;
        }
        journey.Status = 0;
        journey.Driver = null;
        await admin.FindDriver(journey);
        await journey.save();
      }
      await Driver.deleteOne(driver);
      res.send("DELETE DRIVER");
    } catch (error) {
      res.send("ERROR!!!");
    }
  }

  //[DELETE] /deleteTransportation/:type/:id
  async DeleteTransportation(req, res, next) {
    try {
      const type = req.params.type;
      const id = req.params.id;
      var transportation = null;
      switch (type) {
        case "truck":
          // Truck
          transportation = await Truck.findOne({ _id: id });
          break;
        case "coach":
          // Coach
          transportation = await Coach.findOne({ _id: id });
          break;
        default:
          // Car
          transportation = await Car.findOne({ _id: id });
          break;
      }
      if (transportation == null) {
        console.log("Cannot find Transportation");
        return;
      }
      if (transportation.Journey != null) {
        var journey = null;
        journey = await Journey.findOne({ _id: transportation.Journey._id });
        if (journey == null) {
          console.log("Journey is not valid");
          return;
        }
        journey.Status = 0;
        journey.Transportation = null;
        await admin.FindTransportation(journey);
        await journey.save();
      }
      switch (type) {
        case "truck":
          // Truck
          await Truck.deleteOne(transportation);
          break;
        case "coach":
          // Coach
          await Coach.deleteOne(transportation);
          break;
        default:
          // Car
          await Car.deleteOne(transportation);
          break;
      }
      res.send("DELETE TRANSPORTATION");
    } catch (error) {
      res.send("ERROR");
    }
  }

  //[DELETE] /deleteJourney/:id
  async DeleteJourney(req, res, next) {
    try {
      const id = req.params.id;
      const journey = await Journey.findOne({ _id: id });
      if (journey == null) {
        console.log("Cannot find Journey");
        return;
      }
      if (journey.Driver != null) {
        var driver = null;
        driver = await Driver.findOne({ _id: journey.Driver._id });
        if (driver == null) {
          console.log("Driver is not valid");
          return;
        }
        driver.JourneyIncharge = null;
        await admin.FindJourneyForDriver(driver);
        await driver.save();
      }

      if (journey.Transportation != null) {
        var transportation = null;
        switch (journey.TransportationType) {
          case "truck":
            // Truck
            transportation = await Truck.findOne({
              _id: journey.Transportation._id,
            });
            break;
          case "coach":
            // Coach
            transportation = await Coach.findOne({
              _id: journey.Transportation._id,
            });
            break;
          default:
            // Car
            transportation = await Car.findOne({
              _id: journey.Transportation._id,
            });
            break;
        }

        if (transportation == null) {
          console.log("Transportation is not valid");
          return;
        }
        transportation.Journey = null;
        await admin.FindJourneyForTransportation(
          transportation,
          journey.TransportationType
        );
        await transportation.save();
      }

      await Journey.deleteOne(journey);
      res.send("DELETE JOURNEY");
    } catch (error) {
      res.send("ERROR!!!");
    }
  }
}

let admin = Object.freeze(new AdminController());

//singleton
module.exports = admin;
