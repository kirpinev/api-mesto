const { ObjectId } = require('mongodb');
const { messages } = require('../utils/messages');
const { BadRequestError, UnauthorizedError } = require('../errors/index');

module.exports.verifyCardObjectId = (req, res, next) =>
  ObjectId.isValid(req.params.id)
    ? next()
    : next(new BadRequestError(messages.user.id.isNotValid));

module.exports.verifyUserObjectId = (req, res, next) =>
  ObjectId.isValid(req.user._id)
    ? next()
    : next(new BadRequestError(messages.user.id.isNotValid));

module.exports.compareUserObjectIdAndCardId = (req, res, next) =>
  req.user._id === req.params.id
    ? next()
    : next(new UnauthorizedError(messages.authorization.isRequired));
