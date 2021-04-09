const { Superhero } = require("../models");
const createErr = require("http-errors");




module.exports.createSuperhero = async (req, res, next) => {
  try {
    const { body } = req;
    const createdSuperhero = await Superhero.create(body);

    if (!createdSuperhero) {
      return next(createErr(400));
    }
    res.send(createdSuperhero)
  } catch (err) {
    next(err);
  }
};

module.exports.getSuperhero = async (req, res, next) => {
  try {
    const { 
      params: { id },
    } = req;

    const superhero = await Superhero.findByPk(id);

    if (!superhero) {
      return next(createErr(404));
    }
    res.send(superhero)
  } catch (err) {
    next(err);
  }
};

module.exports.getAllSuperheroes = async (req, res, next) => {
  try {
    const { 
      pagination,
    } = req;
    
    const superheroes = await Superhero.findAll({...pagination});

    if (!superheroes) {
      return next(createErr(404));
    }
    res.send(superheroes)
  } catch (err) {
    next(err);
  }
};

module.exports.updateSuperhero = async (req, res, next) => {
  try {
    const { 
      params: { id },
      body,
    } = req;

    const [rowsCount, [updatedSuperhero]] = await Superhero.update(body, {
      where: { id },
      returning: true,
    });

    if (rowsCount !== 1) {
      return next(createErr(400));
    }
    res.send({data: updatedSuperhero});
  } catch (err) {
    next(err);
  }
};

module.exports.deleteSuperhero = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    const rowsCount = await Superhero.destroy({ where: { id } });

    if (rowsCount !== 1) {
      return next(createErr(404));
    }

    res.send({ data: result });
  } catch (err) {
    next(err);
  }
};

module.exports.createSuperheroImage = async (req, res, next) => {
  try {
    const {
      file: { filename },
      params: { imageId },
    } = req;

    const createImage = await Superhero.create(
      { imagePath: filename, 
        superheroId: id
      }
    );

    res.send(createImage);
  } catch (err) {
    next(err);
  }
};

