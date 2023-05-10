const path = require('path');
const express = require('express');
const cors = require('cors');
const route = require('../routes/routes');
const errors = require('../middlewares/errorHandler');

const app = express();
app.use(cors());
const imagesPath = path.resolve('images');

app.use(express.json());
app.use('/images', express.static(imagesPath));
app.use(route);

app.get('/coffee', (_req, res) => res.status(418).end());
app.use(errors);
module.exports = app;