const express = require("express");
const router = express.Router();

const journeyController = require("../app/controllers/JourneyController");

router.use("/:slug", journeyController.addDriver);

router.use("/", journeyController.index);

module.exports = router;
