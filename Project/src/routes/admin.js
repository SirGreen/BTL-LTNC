const express = require("express");
const router = express.Router();

const adminController = require("../app/controllers/AdminController");

router.use("/addTransportation", adminController.AddNewTransportation);
router.use("/addDriver", adminController.AddNewDriver);
router.use("/addJourney", adminController.AddJourney);
router.use("/", adminController.index);

module.exports = router;
