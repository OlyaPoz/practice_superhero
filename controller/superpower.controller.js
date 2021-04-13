const { SuperPower } = require("../models");
const createErr = require("http-errors");

module.exports.getHeroPowers = async (req, res, next) => {
  try {
    const {
      params: { superheroId },
    } = req;

    const powers = await SuperPower.findAll({
      where: { superheroId },
    });

    res.send({ data: powers });
  } catch (err) {
    next(err);
  }
};

module.exports.addHeroPowers = async (req, res, next) => {
  try {
    const {
      params: { superheroId },
      body,
    } = req;

    const powers = body.powers.map(name => ({ name, superheroId }));

    const createdPowers = await SuperPower.bulkCreate(powers);

    if (!createdPowers) {
      return next(createErr(400));
    }

    res.send({ data: createdPowers });
  } catch (err) {
    next(err);
  }
};

module.exports.deletePower = async (req, res, next) => {
  try {
    const {
      params: { superheroId, superpowerId },
    } = req;

    const count = await SuperPower.destroy({
      where: { superheroId, id: superpowerId },
    });

    if (count === 0) {
      return next(createErr(404));
    }

    res.status(200).end();
  } catch (err) {
    next(err);
  }
};