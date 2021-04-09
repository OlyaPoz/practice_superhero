const { Router } = require('express');
const ImageController  = require('../controller/image.controller');
const  { checkSuperhero } = require('../middlewares/superhero.mw');

const imageRouter = Router();

imageRouter.post('/', checkSuperhero, ImageController.createImage);

module.exports = imageRouter;