const { Router } = require('express');
const path = require('path');
const _ = require('lodash');
const SuperheroController = require('../controller/superhero.controller');
const paginate = require('../middlewares/paginate.mw');
const multer = require('multer');
const {STATIC_PATH} = require('../config/configuration');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, STATIC_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.${file.originalname}`);
  },
});

const upload = multer({ storage });

const superheroRouter = Router();

superheroRouter.post("/", SuperheroController.createSuperhero);
superheroRouter.get("/:id", SuperheroController.getSuperhero);
superheroRouter.get("/", paginate, SuperheroController.getAllSuperheroes);
superheroRouter.patch("/:id", SuperheroController.updateSuperhero);
superheroRouter.delete("/:id", SuperheroController.deleteSuperhero);

superheroRouter.post("/:id/image", upload.single('img'),
SuperheroController.createSuperheroImage);

module.exports = superheroRouter;
