const { Router } = require('express');
const path = require('path');
const SuperheroController = require('../controller/superhero.controller');
const paginate = require('../middlewares/paginate.mw');
const multer = require('multer');

const upload = multer({
  dest: path.resolve(__dirname, '../public/images'),
});

const superheroRouter = Router();

superheroRouter.post("/", SuperheroController.createSuperhero);
superheroRouter.get("/:id", SuperheroController.getSuperhero);
superheroRouter.get("/", paginate, SuperheroController.getAllSuperheroes);
superheroRouter.patch("/:id", SuperheroController.updateSuperhero);
superheroRouter.delete("/:id", SuperheroController.deleteSuperhero);

superheroRouter.post("/:id/image", SuperheroController.createImage);

module.exports = superheroRouter;
