const car = require('../models/Car')

class CarController {
    //[GET] /
    index(req, res) {
        res.send("Car page")
    }

    //[GET] /infomation
    async DisplayInfo(req, res)
    {
      try {
        const cars = await car.find({});
        res.json(cars);
        console.log(cars);
      } catch (error) {
        res.status(500).json({ err: "ERROR" });
      }
    }
}
  
module.exports = new CarController();
  