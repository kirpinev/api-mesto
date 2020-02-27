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

  Card.create({ name, link, owner: userId, likes })
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.likeCard = (req, res) => {
  const cardId = req.params.id;
  const user = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    {
      $addToSet: { likes: user }
    },
    { new: true }
  )
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.dislikeCard = (req, res) => {
  const cardId = req.params.id;
  const user = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    {
      $pull: { likes: user }
    },
    { new: true }
  )
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: err.message }));
};
