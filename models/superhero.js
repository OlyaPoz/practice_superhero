"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Superhero extends Model {
    static associate(models) {
      Superhero.hasMany(models.Image, {
        foreignKey: "imageId",
        as: 'images',
      });
    }
  }
  Superhero.init(
    {
      nickname: {
        unique: true,
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      realName: {
        field: "real_name",
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      originDescription: {
        field: "origin_description",
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      catchPhrase: {
        field: "catch_phrase",
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Superhero",
      tableName: "superheroes",
      underscored: true,
    }
  );
  return Superhero;
};
