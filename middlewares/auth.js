require('dotenv').config();
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.auth = (req, res, next) => {
  const { jwt: token } = req.cookies;

  if (!jwt) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'secret-key'
    );
  } catch (err) {
    return res.status(401).send({ message: ' Необходима авторизация' });
  }

  req.user = payload;

  return next();
};
