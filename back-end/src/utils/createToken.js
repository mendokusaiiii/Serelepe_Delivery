const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const keyFilePath = path.resolve('jwt.evaluation.key');
const jwtKey = fs.readFileSync(keyFilePath);

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