'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      Image.belongsTo(models.Superhero, {
        foreignKey: 'superheroId',
      }); 
    }
  };
  Image.init({
    imagePath: {
      field: 'image_path',
      type:DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Image',
    tableName: 'images',
    underscored: true
  });
  return Image;
};