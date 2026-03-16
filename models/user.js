"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // one to one
      User.hasOne(models.Profile, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        as: "userProfile",
      });

      // one to many
      User.hasMany(models.Post, {
        foreignKey: "userId",
        as: "posts",
      });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Name is requried" },
          notEmpty: { msg: "Name cannot be empty" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Email must be unique" },
        validate: {
          notNull: { msg: "Email is requried" },
          notEmpty: { msg: "Email cannot be empty" },
        },
      },
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      paranoid: true,
    },
  );
  return User;
};
