const statusCode = require("../helper/mics");
const successResponse = (res, statusCode, message, token, data) => {
  res.status(statusCode).json({
    message,
    data,
  });
};
module.exports = successResponse;
