const { ObjectId } = require('mongodb');
const escape = require('escape-html');
const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then(cards => res.send({ data: cards }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id: userId } = req.user;

  if (ObjectId.isValid(userId)) {
    Card.create({ name: escape(name), link, owner: userId })
      .then(card => res.status(201).send({ data: card }))
      .catch(err => res.status(400).send({ message: err.message }));
  } else {
    res
      .status(400)
      .send({ message: 'id пользователя не соответствует стандарту' });
  }
};

module.exports.deleteCard = (req, res) => {
  const { _id: userId } = req.user;

  if (ObjectId.isValid(req.params.id)) {
    Card.findById(req.params.id)
      .orFail(() => new Error('нет карточки с таким id'))
      .then(card => {
        if (card.owner._id.toString() !== userId) {
          return res.status(401).send({ message: 'Нужна авторизация' });
        }
        return Card.findByIdAndDelete(req.params.id)
          .then(cardById => {
            res.send({ data: cardById });
          })
          .catch(err => res.status(404).send({ message: err.message }));
      })
      .catch(err => res.status(404).send({ message: err.message }));
  } else {
    res.status(400).send({ message: 'id карточки не соответствует стандарту' });
  }
};

module.exports.likeCard = (req, res) => {
  const { id: cardId } = req.params;
  const { _id: userId } = req.user;

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
  const { id: cardId } = req.params;
  const { _id: userId } = req.user;

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
