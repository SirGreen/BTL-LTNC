const journey = require("../models/Journey");
const driver = require("../models/Driver");
const { json } = require("express");

class JourneyController {
  // [GET]: display all journeys' information
  async index(req, res) {
    try {
      const journeys = await journey.find({});
      res.json(journeys);
      console.log(journeys);
    } catch (error) {
      res.status(500).json({ err: "ERROR" });
    }
  }

  addDriver(req, res) {
    //console.log(req.params.slug);
    journey.findOne({ TransportationType: req.params.slug }).then((j) => {
      console.log(j);
      driver.findOne({ Name: "Test" }).then((driver1) => {
        j.Driver = driver1;
        j.save();
        console.log(j);
        res.send("yeah!!!");
      });
    });
  }
}

module.exports = new JourneyController();
