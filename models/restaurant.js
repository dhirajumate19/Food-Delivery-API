"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Review }) {
      // define association here
      // Restaurant.hasMany(Review, { as: "review" });
      Restaurant.hasMany(Review, { as: "review" });
    }
    comparePassword(password) {
      return bcrypt.compareSync(password, this.password);
    }
    removePassword() {
      const passwordRestaurant = { ...this.get({ plain: true }) };
      delete passwordRestaurant.password;
      return passwordRestaurant;
    }
  }
  Restaurant.init(
    {
      logo: DataTypes.STRING,
      commercialName: DataTypes.STRING,
      legalName: DataTypes.STRING,
      commercialEmail: DataTypes.STRING,
      ownerMobileNumber: DataTypes.STRING,
      address: DataTypes.STRING,
      //location: DataTypes.GEOMETRY("POINT"),
      location: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Restaurant",
    }
  );
  return Restaurant;
};
