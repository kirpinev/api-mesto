const { ObjectId } = require('mongodb');
const { messages } = require('../utils/messages');

module.exports.verifyCardObjectId = (req, res, next) => {
  if (ObjectId.isValid(req.params.id)) {
    next();
  } else {
    res.status(400).send({ message: messages.card.id.isNotValid });
  }
};

module.exports.verifyUserObjectId = (req, res, next) => {
  if (ObjectId.isValid(req.user._id) || ObjectId.isValid(req.params.id)) {
    next();
  } else {
    res.status(400).send({ message: messages.user.id.isNotValid });
  }
};

module.exports.verifyUserObjectIdAndCompareWithCardId = (req, res, next) => {
  const { _id: userId } = req.user;
  const { id: userCardId } = req.params;

  if (ObjectId.isValid(userId) && userId === userCardId) {
    next();
  } else if (userId !== userCardId) {
    res.status(401).send({ message: messages.authorization.isRequired });
  } else if (!ObjectId.isValid(userId)) {
    res.status(400).send({ message: messages.user.id.isNotValid });
  }
};
