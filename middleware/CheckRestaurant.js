const { Restaurant } = require("../models/index");
function CheckRestaurant(req, res, next) {
  Restaurant.findOne({ where: { legalName: req.body.legalname } })
    .then((restaurant) => {
      if (restaurant) {
        res.json({
          message: `The Restaurant already added with Name${req.body.legalname}`,
        });
        return;
      }
      next();
    })
    .catch((err) => {
      console.log("error", err);
    });
}

module.exports = {
  CheckRestaurant: CheckRestaurant,
};
