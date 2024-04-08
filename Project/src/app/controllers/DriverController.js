const driver = require("../models/Driver");

class DriverController {
  index(req, res) {
    res.send("Driver Page");
  }

  //GET information
  async DisplayInfo(req, res) {
    try {
      const drivers = await driver.find({});
      res.json(drivers);
      console.log(drivers);
    } catch (error) {
      res.status(500).json({ err: "ERROR" });
    }
  }

  CompleteJourney(req, res) {}
}

module.exports = new DriverController();
