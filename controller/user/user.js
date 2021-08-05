const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/index");

const myPlaintextPassword = "s0//P4$$w0rD";
const errorMessage = "Something Went Wrong!";

async function UserSignUP(req, res, next) {
  const user = {
    userName: req.body.username,
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    email: req.body.email,
    mobileNumber: req.body.mobilenumber,
    password: bcrypt.hashSync(req.body.password, 10, myPlaintextPassword),
  };
  // const validEmail = validator.isEmail(req.body.email);
  // if (!validEmail) {
  //   res.json({ message: "Enter Valid Email" });
  //   return;
  // }
  // if (!validMobileNumber) {
  //   res.json({ message: "Enter Valid Number" });
  //   return;
  // }
  User.create(user)
    .then((user) => {
      res.status(201).json({
        message: `User Created SuccessFully with:  ${req.body.username}`,
      });
    })
    .catch((err) => {
      console.log("error", err);
      res.status(404).json({
        errorMessage,
      });
    });
}
function Login(req, res, next) {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: `Email Not Found!` });
      }
      const emailValidation = validator.isEmail(req.body.email);
      const validPassword = user.comparePassword(req.body.password, 8);
      if (!emailValidation) {
        res.json({
          message: `Enter Valid Email`,
        });
      } else if (!validPassword) {
        res.json({
          message: `Please Check Your Password!`,
        });
      } else {
        const token = jwt.sign({ id: user.id }, `${process.env.JWT_KEY}`, {
          expiresIn: 86400,
        });
        res.status(201).json({
          message: `Welcome Back`,
          token: token,
        });
      }
    })
    .catch((err) => {
      console.log("error" + err);
    });
}
function GetUser(req, res, next) {
  User.findAll()
    .then((user) => {
      res.status(201).json({
        message: "Users Record",
        user,
      });
    })
    .catch((err) => {
      console.log("error", err);
      errorMessage;
    });
}
function GetUSerByID(req, res, next) {
  console.log(req.params);
  const id = req.params.id;
  console.log(id);
  User.findByPk(id)
    .then((user) => {
      res.locals.user = user;
      console.log("this is ", res.locals.user);
      next();
      // res.json({ user });
    })
    .catch((err) => {});
}
function Update(req, res, next) {
  const { id } = req.params;
  const { email, password } = req.body;
  User.update(
    {
      email,
      password,
    },
    {
      where: {
        id,
      },
    }
  ).then((user) => {
    res.json({
      user,
      message: "Update Done",
    });
  });
}
module.exports = {
  UserSignUP: UserSignUP,
  Login: Login,
  GetUser: GetUser,
  GetUSerByID: GetUSerByID,
  Update: Update,
};
