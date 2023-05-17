const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const keyFilePath = path.resolve('jwt.evaluation.key');
const jwtKey = fs.readFileSync(keyFilePath);

const validateToken = (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) throw new Error('Token not found');

  const { data } = jwt.verify(token, jwtKey, {
     algorithm: 'HS256',
    expiresIn: '1d',
  });
  if (!data) throw new Error('Expired or invalid token');
  req.body.user = data;
  next();
};

module.exports = {
  validateToken,
};
