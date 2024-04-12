const Driver = require("../models/Driver");
const Journey = require("../models/Journey");
const Car = require("../models/Car");
const Coach = require("../models/Coach");
const Truck = require("../models/Truck");
const WarrantyService = require("../models/WarrantyService");

function CalPrice(kilo) {
    return kilo*5000;
}

class AdminController {
  index(req, res) {
    //res.render('admin')
    res.send("ADMIN PAGE");
  }

  async FindJourneyForDriver(driver)
  {
      var journey = null;
      var journeyType = "car";
      switch(driver.DrivingExperience) {
        case 2: // Truck
          journeyType = "truck";
          break;
        case 3: // Coach
          journeyType = "coach";
          break;
      }
      journey = await Journey.findOne({Driver: null, TransportationType: journeyType, Status: 0})
      if(journey==null) 
      {
        console.log("Cannot find suitable Journey");
        return;
      }
      journey.Driver = driver;
      await journey.save();
      driver.JourneyIncharge = journey;
  }

  async FindJourneyForTransportation(transportation, TransportationType)
  {
      var journey = null;
      journey = await Journey.findOne({Transportation: null, TransportationType: TransportationType, Status: 0})
      if(journey==null) 
      {
        console.log("Cannot find suitable Journey");
        return;
      }
      journey.Transportation = transportation;
      await journey.save();
      transportation.Journey = journey;
      transportation.VehicleStatus = "Active";
  }

  //[POST] /addTransportation
  async AddNewTransportation(req, res, next) { //Factory Pattern
    const warranty = new WarrantyService();
    await warranty.save()
    //req.body.TransportationType = "truck"
    switch(req.body.TransportationType) {
      case "truck":
        // code block
        const truck = new Truck({
          Warranty: warranty,
        })
        await admin.FindJourneyForTransportation(truck, "truck");
        await truck.save()
        break;
      case "coach":
        // code block
        const coach = new Coach({
          Warranty: warranty
        })
        await admin.FindJourneyForTransportation(coach, "coach");
        await coach.save()        
        break;
      default:
        const car = new Car({
          Warranty: warranty,
        })
        await admin.FindJourneyForTransportation(car, "car");
        await car.save()
        // code block
    }
    res.send("AddVehicle");
  }

  //[POST] /addDriver
  async AddNewDriver(req, res, next) {
      const driver = new Driver({
        Name: "Test",
        PhoneNumber: "00000000",
        DrivingExperience: 1
      })
      await admin.FindJourneyForDriver(driver);
      await driver.save()
      res.send("AddDriver")
  } 

  async FindDriver(journey)
  {
      if(journey.Driver!=null) return;
      var driver = null;
      var level = 1; //Car
      switch(journey.TransportationType) {
        case "truck": // Truck
          level = 2;
          break;
        case "coach": // Coach
          level = 3;
          break;
      }
      driver = await Driver.findOne({JourneyIncharge: null ,DrivingExperience: {$gte: level}})
      if(driver == null) 
      {
        console.log("Cannot find suitable Driver");
        return;
      }
      driver.JourneyIncharge = journey;
      await driver.save();
      journey.Driver = driver;
  }
////////////////////////////////////
  async FindUnderMaintainanceTransportation(TransportationType){
    var transportation = null;
    switch(TransportationType) {
      case "truck":
        // Truck
        transportation = await Truck.findOne({Journey: null})
        break;
      case "coach":
        // Coach
        transportation = await Coach.findOne({Journey: null})
        break;
      default:
       // Car
       transportation = await Car.findOne({Journey: null})
       break;
    }
    if(transportation != null && transportation.VehicleStatus == "UnderMaintainance"){
      transportation.VehicleStatus = "Active";
      await transportation.save();
      return transportation;
    }
    return transportation;
  }

  async FindTransportation(journey)
  {
      if(journey.Transportation!=null) return;
      var transportation = null;
      switch(journey.TransportationType) {
        case "truck":
          // Truck
          transportation = await Truck.findOne({Journey: null, VehicleStatus: "NotActive"})
          break;
        case "coach":
          // Coach
          transportation = await Coach.findOne({Journey: null, VehicleStatus: "NotActive"})
          break;
        default:
         // Car
         transportation = await Car.findOne({Journey: null, VehicleStatus: "NotActive"})
         break;
      }

      if(transportation == null) 
        transportation = await admin.FindUnderMaintainanceTransportation(journey.TransportationType);

      if(transportation == null) 
      {
        console.log("Cannot find suitable Transportation");
        return;
      }
      transportation.VehicleStatus = "Active";
      transportation.Journey = journey;
      await transportation.save();
      journey.Transportation = transportation;
  }

  //[POST] /addJourney
  async AddJourney(req, res, next) {
    const journey = new Journey({
        StartLocation : "0",
        EndLocation : "10",
        Kilomet : 10,
        TransportationType: "car"
      });
    journey.Price = CalPrice(journey.Kilomet)
    
    await admin.FindDriver(journey);
    await admin.FindTransportation(journey);
    
    await journey.save();
    res.send("AddJourney");
  }
 //////////////////////////////////////////
  async CheckForWarranty(transportation) 
  {
      var date1 = transportation.Warranty.WarrantyTime.getTime();
      var date2 = Date.now();
      if(date1>date2)
      {
        transportation.VehicleStatus = "UnderMaintainance";
        await transportation.save();
        return 0; //maintain
      }
      return 1; //normal
  }

}

let admin = Object.freeze(new AdminController());

//singleton
module.exports = admin;
