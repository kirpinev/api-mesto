const { ObjectId } = require('mongodb');

module.exports.verifyCardObjectId = (req, res, next) => {
  if (ObjectId.isValid(req.params.id)) {
    next();
  } else {
    res.status(400).send({ message: 'id карточки не соответствует стандарту' });
  }
};

module.exports.verifyUserObjectId = (req, res, next) => {
  if (ObjectId.isValid(req.user._id) || ObjectId.isValid(req.params.id)) {
    next();
  } else {
    res
      .status(400)
      .send({ message: 'id пользователя не соответствует стандарту' });
  }
};

module.exports.verifyUserObjectIdAndCompareWithCardId = (req, res, next) => {
  const { _id: userId } = req.user;
  const { id: userCardId } = req.params;

  if (ObjectId.isValid(userId) && userId === userCardId) {
    next();
  } else if (userId !== userCardId) {
    res.status(401).send({ message: 'Нужна авторизация' });
  } else if (!ObjectId.isValid(userId)) {
    res
      .status(400)
      .send({ message: 'id пользователя не соответсвует стандарту' });
  }
};
