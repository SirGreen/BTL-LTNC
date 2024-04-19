const express = require("express");
const router = express.Router();

const adminController = require("../app/controllers/AdminController");

router.use("/addTransportation", adminController.AddNewTransportation);
router.use("/addDriver", adminController.AddNewDriver);
router.use("/addJourney", adminController.AddJourney);
router.use("/addAdmin",adminController.AddAdmin);

router.use("/deleteTransportation/:type/:id", adminController.DeleteTransportation);
router.use("/deleteDriver/:id", adminController.DeleteDriver);
router.use("/deleteJourney/:id", adminController.DeleteJourney);

router.use("/", adminController.index);

module.exports = router;
