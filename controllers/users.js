require('dotenv').config();
const { ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const escape = require('escape-html');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then(user => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'secret-key'
      );

      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true
        })
        .end();
    })
    .catch(err => res.status(401).send({ message: err.message }));
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.getUserById = (req, res) => {
  const { id: userCardId } = req.params;

  if (ObjectId.isValid(userCardId)) {
    User.findById(userCardId)
      .orFail(() => new Error('id пользователя не найден'))
      .then(user => {
        res.send({ data: user });
      })
      .catch(err => res.status(404).send({ message: err.message }));
  } else {
    res
      .status(400)
      .send({ message: 'id пользователя не соответсвует стандарту' });
  }
};

module.exports.createUser = (req, res) => {
  const { email, password, name, about, avatar } = req.body;

  bcrypt.hash(password, 10).then(hash => {
    User.create({
      email,
      password: `${hash}`,
      name: escape(name),
      about: escape(about),
      avatar: escape(avatar)
    })
      .then(user => res.status(201).send({ data: user }))
      .catch(err => res.status(400).send({ message: err.message }));
  });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const { _id: userId } = req.user;
  const { id: userCardId } = req.params;

  if (ObjectId.isValid(userId) && userId === userCardId) {
    User.findByIdAndUpdate(
      userId,
      { name: escape(name), about: escape(about) },
      {
        new: true,
        runValidators: true
      }
    )
      .then(user => res.send({ data: user }))
      .catch(err => res.status(400).send({ message: err.message }));
  } else if (userId !== userCardId) {
    res.status(401).send({ message: 'Нужна авторизация' });
  } else if (!ObjectId.isValid(userId)) {
    res
      .status(400)
      .send({ message: 'id пользователя не соответсвует стандарту' });
  }
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const { _id: userId } = req.user;
  const { id: userCardId } = req.params;

  if (ObjectId.isValid(userId) && userId === userCardId) {
    User.findByIdAndUpdate(
      userId,
      { avatar: escape(avatar) },
      {
        new: true,
        runValidators: true
      }
    )
      .then(user => res.send({ data: user }))
      .catch(err => res.status(400).send({ message: err.message }));
  } else if (userId !== userCardId) {
    res.status(401).send({ message: 'Нужна авторизация' });
  } else if (!ObjectId.isValid(userId)) {
    res
      .status(400)
      .send({ message: 'id пользователя не соответсвует стандарту' });
  }
};
