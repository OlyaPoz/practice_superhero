const { Superhero } = require('../models');

module.exports.checkSuperhero = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    const superheroInstance = await superhero.findByPk(id);

    if (!superheroInstance) {
      throw new Error('superhero not found');
    }

    req.superheroInstance = superheroInstance;
    next();
  } catch (err) {
    next(err);
  }
};