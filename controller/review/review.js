const { Review } = require("../../models/index");

const ReviewAdd = async (req, res, next) => {
  const rating = req.body.rating;
  if (!rating || rating > 10 || rating < 1) {
    return res.status(400).json({
      message: `Please input an accepted rating `,
      code: 400,
    });
  }
  const review = {
    restaurantId: req.body.restaurantId,
    review: req.body.review,
    rating: Math.floor(parseInt(rating, 10)),
    customerName: req.body.customername,
  };

  await Review.create(review)
    .then((review) => {
      res.status(200).json({
        message: `The Review Has been Recorded Successfully`,
        code: 200,
      });
    })
    .catch((err) => {
      console.log("error", err);
    });
};
module.exports = {
  ReviewAdd,
};
