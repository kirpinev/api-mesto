const escape = require('escape-html');
const Card = require('../models/card');
const { messages } = require('../utils/messages');

const verifyCardAndSend = (card, res) => {
  if (!card) {
    return Promise.reject(new Error(messages.card.id.isNotFound));
  }

  return res.send({ data: card });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then(cards => res.send({ data: cards }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  Card.create({
    name: escape(req.body.name),
    link: req.body.link,
    owner: req.user._id
  })
    .then(card => res.status(201).send({ data: card }))
    .catch(err => res.status(400).send({ message: err.message }));
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.id)
    .orFail(() => new Error(messages.card.id.isNotFound))
    .then(card => {
      if (card.owner._id.toString() !== req.user._id) {
        return res
          .status(401)
          .send({ message: messages.authorization.isRequired });
      }
      return Card.findByIdAndDelete(req.params.id)
        .then(cardById => {
          res.send({ data: cardById });
        })
        .catch(err => res.status(404).send({ message: err.message }));
    })
    .catch(err => res.status(404).send({ message: err.message }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    {
      $addToSet: { likes: req.user._id }
    },
    { new: true }
  )
    // .orFail(() => new Error('нет карточки с таким id'))
    .then(card => verifyCardAndSend(card, res))
    .catch(err => res.status(404).send({ message: err.message }));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { likes: req.user._id }
    },
    { new: true }
  )
    // .orFail(() => new Error('нет карточки с таким id'))
    .then(card => verifyCardAndSend(card, res))
    .catch(err => res.status(404).send({ message: err.message }));
};
