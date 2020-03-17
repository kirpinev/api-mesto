const jwt = require('jsonwebtoken');
const { verifyToken } = require('../utils/token');
const { messages } = require('../utils/messages');

module.exports.auth = (req, res, next) => {
  const { jwt: token } = req.cookies;

  if (!jwt) {
    return res.status(401).send({ message: messages.authorization.isRequired });
  }

  let payload;

  try {
    payload = verifyToken(token);
  } catch (err) {
    return res.status(401).send({ message: messages.authorization.isRequired });
  }

  req.user = payload;

  return next();
};
