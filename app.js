const express = require('express');
const router = require('./routes');
const { STATIC_PATH } = require('./config/config');
const app = express();



app.use(express.json());

app.use('/api', router);

module.exports = app;