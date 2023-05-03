const jwt = require('jsonwebtoken');
const path = require('path');

const keyFilePath = path.resolve('jwt.evaluation.key');
const jwtKey = require('fs')
  .readFileSync(keyFilePath, { encoding: 'utf-8' });

const createToken = (data) => {
  const token = jwt.sign({ data }, jwtKey, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });
  return token;
};
 
module.exports = {
  createToken,
};