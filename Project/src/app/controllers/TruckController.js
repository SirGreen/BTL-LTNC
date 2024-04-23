const truck = require("../models/Truck");
const ObjectId = require("mongodb").ObjectId;

class TruckController {
  //[GET] /
  index(req, res) {
    res.send("Truck page");
  }

  //[GET] /infomation
  async DisplayInfo(req, res) {
    try {
      const trucks = await truck.find({});
      res.json(trucks);
      console.log(trucks);
    } catch (error) {
      res.status(500).json({ err: "ERROR" });
    }
  }

  //[GET] /information about a specific truck
  async ShowThis(req, res) {
    try {
      if (!ObjectId.isValid(req.params.id)) {
        res.send("Invalid truck ID");
        return;
      }
      var thistruck = null;
      thistruck = await truck.findOne({ _id: req.params.id });
      if (thistruck == null) {
        res.send("No truck with that ID!!!");
        return;
      }
      res.json(thistruck);
      console.log(thistruck);
    } catch (error) {
      res.status(500).json({ err: "ERROR: Invalid ID" });
    }
  }
}

module.exports = new TruckController();
