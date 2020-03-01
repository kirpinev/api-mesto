const { ObjectId } = require('mongodb');
const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.getUserById = (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    User.findById(req.params.id)
      .orFail(Error('id пользователя не найден'))
      .then(user => {
        res.send({ data: user });
      })
      .catch(err => res.status(404).send({ message: err.message }));
  } else {
    res.status(400).send({ message: 'id пользователя не соответсвует стандарту' });
  }
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.status(201).send({ data: user }))
    .catch(err => res.status(400).send({ message: err.message }));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  if (ObjectId.isValid(userId)) {
    User.findByIdAndUpdate(
      userId,
      { name, about },
      {
        new: true,
        runValidators: true
      }
    )
      .then(user => res.send({ data: user }))
      .catch(err => res.status(400).send({ message: err.message }));
  } else {
    res.status(400).send({ message: 'id пользователя не соответсвует стандарту' });
  }
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  if (ObjectId.isValid(userId)) {
    User.findByIdAndUpdate(
      userId,
      { avatar },
      {
        new: true,
        runValidators: true
      }
    )
      .then(user => res.send({ data: user }))
      .catch(err => res.status(400).send({ message: err.message }));
  } else {
    res.status(400).send({ message: 'id пользователя не соответсвует стандарту' });
  }
};
