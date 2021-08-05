const validator = require("validator");
const message = require("../utils/message");
const { User } = require("../models/index");

const createErrorMessage = (type, min, max, empty, pattern) => ({
  [`${type}.empty`]: empty,
  [`${type}.format`]: pattern,
  [`${type}.min`]: min,
  [`${type}.max`]: max,
  [`${type}.pattern.base`]: pattern,
  "any.required": empty,
});
const Verification = (data, res, next) => {
  console.log(data);
  const validEmail = validator.isEmail(data.email);
  const validFirstName = validator.isEmpty(data.firstname);
  //console.log(validFirstName, data.firstname);
  const validLastName = validator.isEmpty(data.lastname);
  const validateMobileNumber = validator.isMobilePhone(data.mobilenumber, [
    "id - ID",
  ]);
  console.log(validateMobileNumber, data.mobilenumber);
  const validatePassword = validator.isStrongPassword(data.password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  });
  if (!validEmail) {
    res.json({ message: "Enter Valid Email" });
    return;
  } else if (validFirstName) {
    res.json({ message: "Enter Valid First Name" });
    return;
  } else if (validLastName) {
    res.json({ message: "Enter Valid Last Name" });
    return;
  } else if (validateMobileNumber) {
    res.json({ message: "Enter Valid Mobile Number" });
    return;
  } else if (!validatePassword) {
    res.json({ message: "Password Not Matches Requirement" });
    return;
  } else {
    return;
  }
};
module.exports = {
  Verification,
  createErrorMessage,
};
