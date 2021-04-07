const { Router } = require("express");
const SuperheroController = require("../controller/superhero.controller");

const superheroRouter = Router();

superheroRouter.post("/", SuperheroController.createSuperhero);
superheroRouter.get("/:id", SuperheroController.getSuperhero);
superheroRouter.get("/", SuperheroController.getAllSuperheroes);
superheroRouter.patch("/:id", SuperheroController.updateSuperhero);
superheroRouter.delete("/:id", SuperheroController.deleteSuperhero);

module.exports = superheroRouter;
