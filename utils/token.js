const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const secretKey = NODE_ENV === 'production' ? JWT_SECRET : 'secret-key';

module.exports.createToken = user => jwt.sign({ _id: user._id }, secretKey);

module.exports.verifyToken = token => jwt.verify(token, secretKey);
