const journey = require("../models/Journey");
const driver = require("../models/Driver");
const { json } = require("express");

class JourneyController {
  index(req, res) {
    res.send("Journey page!");
  }

  // [GET]: display all journeys' information
  async DisplayAll(req, res) {
    try {
      var journeys = null;
      journeys = await journey.find({});
      if (journeys == null) {
        res.send("No journeys to display!!!");
        return;
      }
      res.json(journeys);
      console.log(journeys);
    } catch (error) {
      res.status(500).json({ err: "ERROR" });
    }
  }

  // [GET]: display one journey with ID
  async DisplayJourney(req, res) {
    try {
      var j = null;
      j = await journey.findOne({ _id: req.params.id });
      if (j == null) {
        res.send("No journey with that ID!!!");
        return;
      }
      res.json(j);
      console.log(j);
    } catch (error) {
      res.status(500).json({ err: "ERROR: Invalid ID" });
    }
  }

  // addDriver(req, res) {
  //   //console.log(req.params.slug);
  //   journey.findOne({ TransportationType: req.params.slug }).then((j) => {
  //     console.log(j);
  //     driver.findOne({ Name: "Test" }).then((driver1) => {
  //       j.Driver = driver1;
  //       j.save();
  //       console.log(j);
  //       res.send("yeah!!!");
  //     });
  //   });
  // }
}

module.exports = new JourneyController();
