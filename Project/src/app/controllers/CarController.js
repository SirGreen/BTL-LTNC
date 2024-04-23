const car = require("../models/Car");
const ObjectId = require("mongodb").ObjectId;

class CarController {
  //[GET] /
  index(req, res) {
    res.send("Car page");
  }

  //[GET] /infomation
  async DisplayInfo(req, res) {
    try {
      const cars = await car.find({});
      res.json(cars);
      console.log(cars);
    } catch (error) {
      res.status(500).json({ err: "ERROR" });
    }
  }

  //[GET] /information about a specific car
  async ShowThis(req, res) {
    try {
      if (!ObjectId.isValid(req.params.id)) {
        res.send("Invalid car ID");
        return;
      }
      var thisCar = null;
      thisCar = await car.findOne({ _id: req.params.id });
      if (thisCar == null) {
        res.send("No car with that ID!!!");
        return;
      }
      res.json(thisCar);
      console.log(thisCar);
    } catch (error) {
      res.status(500).json({ err: "ERROR: Invalid ID" });
    }
  }
}

module.exports = new CarController();
