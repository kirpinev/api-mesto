const { verifyToken } = require('../utils/token');
const { messages } = require('../utils/messages');
const { UnauthorizedError } = require('../errors/index');

module.exports.auth = (req, res, next) => {
  const { jwt: token } = req.cookies;

  if (!token) {
    return next(new UnauthorizedError(messages.authorization.isRequired));
  }

  let payload;

  try {
    payload = verifyToken(token);
  } catch (err) {
    return next(new UnauthorizedError(messages.authorization.isRequired));
  }

  req.user = payload;

  return next();
};
