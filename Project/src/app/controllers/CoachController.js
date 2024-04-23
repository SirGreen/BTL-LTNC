const coach = require("../models/Coach");
const ObjectId = require("mongodb").ObjectId;

class CoachController {
  //[GET] /
  index(req, res) {
    res.send("Coach page");
  }

  //[GET] /infomation
  async DisplayInfo(req, res) {
    try {
      const coaches = await coach.find({});
      res.json(coaches);
      console.log(coaches);
    } catch (error) {
      res.status(500).json({ err: "ERROR" });
    }
  }
  //[GET] /information about a specific coach
  async ShowThis(req, res) {
    try {
      if (!ObjectId.isValid(req.params.id)) {
        res.send("Invalid coach ID");
        return;
      }
      var thiscoach = null;
      thiscoach = await coach.findOne({ _id: req.params.id });
      if (thiscoach == null) {
        res.send("No coach with that ID!!!");
        return;
      }
      res.json(thiscoach);
      console.log(thiscoach);
    } catch (error) {
      res.status(500).json({ err: "ERROR: Invalid ID" });
    }
  }
}

module.exports = new CoachController();
