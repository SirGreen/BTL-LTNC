class AdminController {
  index(req, res) {
    //res.render('admin')
    res.send("ADMIN PAGE");
  }

  //POST
  AddNewVehicle() {}

  //POST
  AddNewDriver() {}

  //GET
  DisplayVehicle() {}

  //GET
  DisplayDriver() {}

  CalDisAndPrice() {}

  //POST
  AddJourney() {
    this.CalDisAndPrice();
  }

  //POST
  UpdateVehicleInfo() {}
}

module.exports = new AdminController();
