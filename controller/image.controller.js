const { Image, Superhero } = require("../models");
const createErr = require("http-errors");

module.exports.createImage = async (req, res, next) => {
  try {
    
    const superheroImg = await Superhero.createImage(image);

    if (!superheroImg) {
      return next(createErr(400));
    }
    res.send(superheroImg)
  } catch (err) {
    next(err);
  }
};

module.exports.getSuperheroImgs = async (req, res, next) => {
  try {
    const { superheroInstance: superhero } = req;

    const imgs = await superhero.getImages();

    if (!imgs.length) {
      return next(createError(404));
    }

    res.send({ data: imgs });
  } catch (err) {
    next(err);
  }
};

module.exports.getImage = async (req, res, next) => {
  try {
    const { 
      params: { id },
    } = req;

    const image = await Image.findByPk(id);

    if (!image) {
      return next(createErr(404));
    }
    res.send(image)
  } catch (err) {
    next(err);
  }
};

module.exports.getAllImages = async (req, res, next) => {
  try {
    
    const images = await Superhero.findAll();

    if (!images) {
      return next(createErr(404));
    }
    res.send(images)
  } catch (err) {
    next(err);
  }
};

module.exports.deleteImage = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    const rowsCount = await Image.destroy({ where: { id } });

    if (rowsCount !== 1) {
      return next(createErr(404));
    }

    res.send({ data: result });
  } catch (err) {
    next(err);
  }
};