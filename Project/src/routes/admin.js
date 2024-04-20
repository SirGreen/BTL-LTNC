const express = require("express");
const router = express.Router();

const adminController = require("../app/controllers/AdminController");

router.use("/addTransportation", adminController.AddNewTransportation);
router.use("/addDriver", adminController.AddNewDriver);
router.use("/addJourney", adminController.AddJourney);
router.use("/addAdmin", adminController.AddAdmin);
router.use("/update/driver/:id", adminController.UpdateDriver);
router.use("/update/car/:id", adminController.UpdateCar);
router.use("/update/truck/:id", adminController.UpdateTruck);
router.use("/update/coach/:id", adminController.UpdateCoach);
router.use("/", adminController.index);

module.exports = router;
