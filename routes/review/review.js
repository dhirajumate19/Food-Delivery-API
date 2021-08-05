const express = require("express");
const router = express.Router();

const reviewController = require("../../controller/review/review");

router.post("/", reviewController.ReviewAdd);

module.exports = router;
