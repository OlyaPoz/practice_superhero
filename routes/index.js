const { Router } = require('express');
const superheroRouter = require('./superhero');
const imageRouter = require('./image');

const router = Router();

router.use('/superhero', superheroRouter);
router.use('/image', imageRouter);

module.exports = router;