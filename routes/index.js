const { Router } = require('express');
const superheroRouter = require('./superhero');

const router = Router();

router.use('/superhero', superheroRouter);

module.exports = router;