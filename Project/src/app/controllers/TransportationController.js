const Transportation = require('../models/Transportation')

class TransportationController {
    index(req, res) {
      res.send("TRANSPORTATION PAGE");
    }
    // [GET] /transportation/create
    create(req, res, next){
        res.send("TRANSPORTATION CREATE");
    }
    // [POST] /transportation/store
    store(req, res, next){
        const newTransportation = new Transportation({
            Capacity: 10,
            Size: 10,
            TypeOfFuel: "Disel",
        });
        newTransportation.save()
            .catch(error => {
                res.send("ERROR")
            })
        res.send("Transportation Saved")
    }
  }
  
  module.exports = new TransportationController();
  