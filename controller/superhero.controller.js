const { Superhero,  SuperPower, Image } = require("../models");
const createErr = require("http-errors");


module.exports.createSuperhero = async (req, res, next) => {
  try {
    const { body, files } = req;
    const superhero = await Superhero.create(body);

    if (!superhero) {
      return next(createErr(400));
    }
    if (files?.length) {
      const images = files.map(file => ({
        path: file.filename,
        superheroId: superhero.id,
      }));

      await Image.bulkCreate(images, {
        returning: true,
      });
    }

    if (body?.superPowers?.length) {
      const powers = body.SuperPowers.map(power => ({
        name: power,
        superheroId: superhero.id,
      }));

      await SuperPower.bulkCreate(powers, {
        returning: true,
      });
    }

    const heroWithData = await Superhero.findAll({
      where: {
        id: superhero.id,
      },
      include: [
        {
          model: SuperPower,
          attributes: ['id', 'name'],
          as: 'superPowers',
        },
        {
          model: Image,
          attributes: ['id', 'path'],
          as: 'images',
        },
      ],
    });
    res.status(201).send({ data: heroWithData });
  } catch (err) {
    next(err);
  }
};

module.exports.getSuperhero = async (req, res, next) => {
  try {
    const { 
      params: { id },
    } = req;

    const superhero = await Superhero.findByPk(id,
       {
        include: [
          {
            model: SuperPower,
            attributes: ['id', 'name'],
            as: 'superPowers',
          },
          {
            model: Image,
            attributes: ['id', 'path'],
            as: 'images',
          },
        ],
      });

    if (!superhero) {
      return next(createErr(404));
    }
    res.send({data: superhero});
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

    if (!superheroes.length) {
      return next(createErr(404));
    }
    res.send({data: superheroes});
  } catch (err) {
    next(err);
  }
};

module.exports.updateSuperhero = async (req, res, next) => {
  try {
    const { 
      params: { id },
      body: { files },
      body,
    } = req;

    const [rowsCount, [updatedSuperhero]] = await Superhero.update(body, {
      where: { id },
      returning: true,
    });

    if (files?.length) {
      const images = files.map(file => ({
        path: file.filename,
        superheroId: updatedSuperhero.id,
      }));

      await Image.bulkCreate(images, {
        returning: true,
      });
    }

    if (body.SuperPowers) {
      const powers = body.SuperPowers.map(power => ({
        name: power,
        superheroId: updatedSuperhero.id,
      }));

      await SuperPower.bulkCreate(powers, {
        returning: true,
      });
    }

    if (rowsCount === 0) {
      return next(createErr(404));
    }

    const heroWithData = await Superhero.findAll({
      where: {
        id: updatedSuperhero.id,
      },
      include: [
        {
          model: SuperPower,
          attributes: ['id', 'name'],
          as: 'superPowers',
        },
        {
          model: Image,
          attributes: ['id', 'path'],
          as: 'images',
        },
      ],
    });

    res.send({data: heroWithData});
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

    res.status(200).end();
  } catch (err) {
    next(err);
  }
};
