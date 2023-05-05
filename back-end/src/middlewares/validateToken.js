const jwt = require('jsonwebtoken');
const path = require('path');

const keyFilePath = path.resolve('jwt.evaluation.key');
const jwtKey = require('fs')
  .readFileSync(keyFilePath, { encoding: 'utf-8' });

const validateToken = (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) throw new Error('Token not found');
  const { data } = jwt.verify(token, jwtKey);
  if (!data) throw new Error('Expired or invalid token');
  req.body.user = data;
  next();
};

module.exports = {
  validateToken,
};
