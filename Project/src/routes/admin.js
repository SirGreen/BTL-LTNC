const express = require("express");
const router = express.Router();

const adminController = require("../app/controllers/AdminController");

router.use("/addDriver", adminController.AddDriver);
router.use("/addJourney", adminController.AddJourney);
router.use("/addAdmin",adminController.AddAdmin);
router.use("/", adminController.index);

module.exports = router;
