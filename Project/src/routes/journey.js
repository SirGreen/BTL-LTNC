const express = require("express");
const router = express.Router();

const journeyController = require("../app/controllers/JourneyController");

router.use("/all", journeyController.DisplayAll);
router.use("/:id", journeyController.DisplayJourney);

router.use("/", journeyController.index);

module.exports = router;
