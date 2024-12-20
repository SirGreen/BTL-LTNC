const express = require("express");
const router = express.Router();

const HomeController = require("../app/controllers/HomeController");
const DriverController = require("../app/controllers/DriverController");
const CarController = require("../app/controllers/CarController");
const CoachController = require("../app/controllers/CoachController");
const TruckController = require("../app/controllers/TruckController");

router.use("/driver/all", DriverController.DisplayAll);
router.use("/driver/completeJourney/:id", DriverController.CompleteJourney);
router.use("/driver/:id", DriverController.DisplayInfo);
router.use("/car/:id", CarController.ShowThis);
router.use("/car", CarController.DisplayInfo);
router.use("/truck/:id", TruckController.ShowThis);
router.use("/truck", TruckController.DisplayInfo);
router.use("/coach/:id", CoachController.ShowThis);
router.use("/coach", CoachController.DisplayInfo);

router.use("/", HomeController.index);

module.exports = router;
