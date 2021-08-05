const express = require("express");
const router = express.Router();

const restaurantController = require("../../controller/restaurant/restaurant");
const restaurantMiddleware = require("../../middleware/CheckRestaurant");

router.post(
  "/signup",
  restaurantMiddleware.CheckRestaurant,
  restaurantController.CreateRestaurant
); //[Post: /api/restaurant/signup]
router.get("/list", restaurantController.ListRestaurants);

module.exports = router;
