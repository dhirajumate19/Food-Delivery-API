const { User } = require("../models/index");
const message = require("../utils/message");
const { userNameExisted, emailAlreadyExisted } = message;
const statusCode = require("../utils/statusCodes");
const { notFound } = statusCode;
const { Verification } = require("../validation/userValidation");

const VerifyUser = async (req, res, next) => {
  const user = await User.findOne({ where: { userName: req.body.username } });
  const userEmail = await User.findOne({ where: { email: req.body.email } });

  await Verification(req.body, res, next);

  if (user) {
    res.status(404).json({
      notFound,
      userNameExisted,
    });
    return;
  } else if (userEmail) {
    res.status(404).json({
      notFound,
      emailAlreadyExisted,
    });
    return;
  }
  next();
};
module.exports = {
  VerifyUser: VerifyUser,
};
