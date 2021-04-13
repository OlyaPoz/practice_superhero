
const superpowerRouter = require('express').Router({ mergeParams: true });
const PowerController = require('../controller/superpower.controller');

superpowerRouter
  .route('/')
  .get(PowerController.getHeroPowers)
  .post(PowerController.addHeroPowers);

superpowerRouter.delete('/:superpowerId', PowerController.deletePower);

module.exports = superpowerRouter;