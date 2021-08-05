const { Restaurant } = require("../../models/index");
const { Review } = require("../../models/index");
const bcrypt = require("bcrypt");

const errorMessage = "Something Went Wrong!";

async function CreateRestaurant(req, res, next) {
  // let geopoints = req.body.geopoints;
  // console.log(geopoints);
  // let geopointsTest = [39.807222, -76.984722];
  // console.log(typeof geopoints, typeof geopointsTest);

  // let location = {
  //   type: "Point",
  //   coordinates: geopointsTest,
  // };
  // const point = ST_GeomFromText({
  //   type: "Point",
  //   coordinates: [39.807222, -76.984722],
  // });
  // const point = {
  //   type: "Point",
  //   coordinates: [39.807222, -76.984722],
  // };
  const restaurant = {
    logo: req.body.logo,
    commercialName: req.body.commercialname,
    legalName: req.body.legalname,
    commercialEmail: req.body.commercialemail,
    ownerMobileNumber: req.body.ownermobile,
    address: req.body.address,
    location: req.body.location,
    password: bcrypt.hashSync(req.body.password, 10, "s0//P4$$w0rD"),
  };
  console.log(restaurant);
  await Restaurant.create(restaurant)
    .then((restaurant) => {
      res.status(200).json({
        message: `The restaurant called ${req.body.commercialname} has been created`,
        code: 200,
      });
    })
    .catch((err) => {
      console.log("error", err);
      res.status(404).json({
        errorMessage,
        err,
      });
    });
}
async function ListRestaurants(req, res, next) {
  let rating = req.query.rating;
  console.log(rating);
  rating = Math.ceil(rating);
  console.log(rating);
  if (rating > 10 || rating < 1) {
    return res.status(400).json({
      message: `Please input ratings between 1 and 10`,
      code: 400,
    });
  }

  await Restaurant.findAll({ include: "review" })
    .then((List) => {
      res.status(200).json({
        message: `List Of Restaurants`,
        List,
      });
    })
    .catch((err) => {
      console.log("error", err);
    });
}
module.exports = {
  CreateRestaurant: CreateRestaurant,
  ListRestaurants: ListRestaurants,
};
