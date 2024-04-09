const coach = require('../models/Car')

class CoachController {
    //[GET] /
    index(req, res) {
        res.send("Coach page")
    }

    //[GET] /infomation
    async DisplayInfo(req, res)
    {
      try {
        const coaches = await car.find({});
        res.json(coaches);
        console.log(coaches);
      } catch (error) {
        res.status(500).json({ err: "ERROR" });
      }
    }
}
  
module.exports = new CoachController();
  