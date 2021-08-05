const express = require("express");
const router = express.Router();

const userController = require("../../../controller/user/user");
router.use(userController.GetUSerByID);

router.get("/", (req, res, next) => {
  res.json(res.locals.user);
});

router.get("/:id", (req, res, next) => {
  res.json(res.locals.user);
});

router.patch("/update", userController.Update); //[Patch: /api/user/:id/update]
module.exports = router;
