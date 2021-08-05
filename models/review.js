"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Restaurant }) {
      //  define association here
      Review.belongsTo(Restaurant, {
        as: "restaurant",
      });
    }
  }
  Review.init(
    {
      restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      review: DataTypes.STRING,
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      customerName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
