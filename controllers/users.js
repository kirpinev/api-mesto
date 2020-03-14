const { ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const escape = require('escape-html');
const User = require('../models/user');
const { createToken } = require('../utils/token');

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then(user => {
      const token = createToken(user);

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true
      });

      res.status(200).send({ message: 'Вход успешно выполнен' });
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

  if (!password) {
    return res.status(400).send({ message: 'Поле пароля непередано' });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .send({ message: 'Длина пароля должна быть минимум 8 символов' });
  }

  return bcrypt.hash(password, 10).then(hash => {
    User.create({
      email,
      password: `${hash}`,
      name: escape(name),
      about: escape(about),
      avatar: escape(avatar)
    })
      .then(user =>
        res.status(201).send({
          data: {
            email: user.email,
            name: user.name,
            about: user.about,
            avatar: user.avatar
          }
        })
      )
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
