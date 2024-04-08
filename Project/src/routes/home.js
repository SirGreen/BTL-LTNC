const express = require("express");
const router = express.Router();

const HomeController = require("../app/controllers/HomeController");
const DriverController = require("../app/controllers/DriverController");

router.use("/driver", DriverController.DisplayInfo);

router.use("/", HomeController.index);

module.exports = router;
