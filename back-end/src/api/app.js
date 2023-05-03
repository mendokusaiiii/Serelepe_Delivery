const express = require('express');
const route = require('../routes/routes');

const app = express();
const errors = require('../middlewares/errorHandler');

app.use(express.json());
app.use(route);

app.use(errors);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
