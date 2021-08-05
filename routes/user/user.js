const express = require("express");
const router = express.Router();

const userController = require("../../controller/user/user");
const userMiddleware = require("../../middleware/VerifyUser");
const userID = require("./id/index");

router.post("/signup", userMiddleware.VerifyUser, userController.UserSignUP); //[Post: /api/user/signup]
router.post("/signin", userController.Login); //[Post: /api/user/signin]
router.get("/", userController.GetUser);
router.get("/:id", userController.GetUSerByID);
router.patch("/:id/update", userController.Update); //[Patch :/api/user/:id/update]

module.exports = router;
