const { ObjectId } = require('mongodb');
const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then(cards => res.send({ data: cards }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const { name, link, likes } = req.body;
  const userId = req.user._id;

  if (ObjectId.isValid(userId)) {
    Card.create({ name, link, owner: userId, likes })
      .then(card => res.status(201).send({ data: card }))
      .catch(err => res.status(400).send({ message: err.message }));
  } else {
    res
      .status(400)
      .send({ message: 'id пользователя не соответствует стандарту' });
  }
};

module.exports.deleteCard = (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    Card.findByIdAndDelete(req.params.id)
      .orFail(() => new Error('нет карточки с таким id'))
      .then(card => {
        res.send({ data: card });
      })
      .catch(err => res.status(404).send({ message: err.message }));
  } else {
    res.status(400).send({ message: 'id карточки не соответсвует стандарту' });
  }
};

module.exports.likeCard = (req, res) => {
  const cardId = req.params.id;
  const userId = req.user._id;

  if (ObjectId.isValid(cardId)) {
    Card.findByIdAndUpdate(
      cardId,
      {
        $addToSet: { likes: userId }
      },
      { new: true }
    )
      .orFail(() => new Error('нет карточки с таким id'))
      .then(card => res.send({ data: card }))
      .catch(err => res.status(404).send({ message: err.message }));
  } else {
    res.status(400).send({ message: 'id карточки не соответствует стандарту' });
  }
};

module.exports.dislikeCard = (req, res) => {
  const cardId = req.params.id;
  const userId = req.user._id;

  if (ObjectId.isValid(cardId)) {
    Card.findByIdAndUpdate(
      cardId,
      {
        $pull: { likes: userId }
      },
      { new: true }
    )
      .orFail(() => new Error('нет карточки с таким id'))
      .then(card => {
        res.send({ data: card });
      })
      .catch(err => res.status(404).send({ message: err.message }));
  } else {
    res.status(400).send({ message: 'id карточки не соответствует стандарту' });
  }
};
