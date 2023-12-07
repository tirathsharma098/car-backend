const router = require("express").Router();

// Importing All routes
const carRoute = require("./carRoute");

// All routes
router.use("/car", carRoute);

module.exports = router;