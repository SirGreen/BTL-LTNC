const truck = require('../models/Truck')

class TruckController {
    //[GET] /
    index(req, res) {
        res.send("Truck page")
    }

    //[GET] /infomation
    async DisplayInfo(req, res)
    {
      try {
        const trucks = await truck.find({});
        res.json(trucks);
        console.log(trucks);
      } catch (error) {
        res.status(500).json({ err: "ERROR" });
      }
    }
}
  
module.exports = new TruckController();
  