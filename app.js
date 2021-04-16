const express = require('express');
const router = require('./routes');
const { STATIC_PATH } = require('./config/configuration');
const errorHandler = require('./middlewares/err.handlers');

const app = express();

app.use(express.static(STATIC_PATH));

app.use(express.json());

app.use('/api', router);

app.use(errorHandler);

app.use(express.static('public'));

module.exports = app;