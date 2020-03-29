const escape = require('escape-html');
const Card = require('../models/card');
const { messages } = require('../utils/messages');
const {
  BadRequestError,
  UnauthorizedError,
  NotFoundError
} = require('../errors/index');

const verifyCardAndSend = (card, res) => {
  if (!card) {
    throw new NotFoundError(messages.card.id.isNotFound);
  }

  return res.send({ data: card });
};

module.exports.getCards = (req, res, next) =>
  Card.find({})
    .populate('owner')
    .then(cards => res.send({ data: cards }))
    .catch(next);

module.exports.createCard = (req, res, next) =>
  Card.create({
    name: escape(req.body.name),
    link: req.body.link,
    owner: req.user._id
  })
    .then(card => res.status(201).send({ data: card }))
    .catch(err => next(new BadRequestError(err.message)));

module.exports.deleteCard = (req, res, next) =>
  Card.findById(req.params.id)
    .orFail(() => new NotFoundError(messages.card.id.isNotFound))
    .then(card => {
      if (card.owner._id.toString() !== req.user._id) {
        throw new UnauthorizedError(messages.authorization.isRequired);
      }
      return Card.findByIdAndDelete(req.params.id)
        .then(cardById => res.send({ data: cardById }))
        .catch(next);
    })
    .catch(next);

module.exports.likeCard = (req, res, next) =>
  Card.findByIdAndUpdate(
    req.params.id,
    {
      $addToSet: { likes: req.user._id }
    },
    { new: true }
  )

    .then(card => verifyCardAndSend(card, res))
    .catch(next);

module.exports.dislikeCard = (req, res, next) =>
  Card.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { likes: req.user._id }
    },
    { new: true }
  )

    .then(card => verifyCardAndSend(card, res))
    .catch(next);
