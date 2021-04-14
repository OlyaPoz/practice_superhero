const superheroRouter = require('express').Router({ mergeParams: true });
const imageRouter = require('./image');
const superpowerRouter = require ('./superpowers');
const SuperheroController = require('../controller/superhero.controller');
const paginate = require('../middlewares/paginate.mw');
const { uploadImages } = require('../middlewares/file.upload');

superheroRouter
  .route('/')
  .get(paginate, SuperheroController.getAllSuperheroes)
  .post(uploadImages, SuperheroController.createSuperhero);

superheroRouter
  .route('/:id')
  .get(SuperheroController.getSuperhero)
  .put(SuperheroController.updateSuperhero)
  .delete(SuperheroController.deleteSuperhero);

superheroRouter.use('/:superheroId/images/', imageRouter);
superheroRouter.use('/:superheroId/superpowers/', superpowerRouter);

module.exports = superheroRouter;
