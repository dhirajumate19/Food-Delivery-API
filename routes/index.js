const express = require("express");
const router = express.Router();

const userRoutes = require("../routes/user/user");
const restaurantRoutes = require("./restaurant/restaurant");
const reviewRoutes = require("./review/review");

router.use("/user", userRoutes);
router.use("/restaurant", restaurantRoutes);
router.use("/review", reviewRoutes);

module.exports = router;
