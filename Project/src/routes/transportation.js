const express = require("express");
const router = express.Router();

const transportationController = require("../app/controllers/TransportationController");

router.get("/create", transportationController.create);
router.use("/store",transportationController.store);
router.get("/", transportationController.index);

module.exports = router;
