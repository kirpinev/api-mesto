const bcrypt = require('bcryptjs');
const escape = require('escape-html');
const User = require('../models/user');
const { createToken } = require('../utils/token');
const { messages } = require('../utils/messages');

module.exports.login = (req, res) => {
  return User.findUserByCredentials(req.body.email, req.body.password)
    .then(user => {
      const token = createToken(user);

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true
      });

      res.status(200).send({ message: messages.authorization.isSuccessful });
    })
    .catch(err => res.status(401).send({ message: err.message }));
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => new Error(messages.user.id.isNotFound))
    .then(user => {
      res.send({ data: user });
    })
    .catch(err => res.status(404).send({ message: err.message }));
};

module.exports.createUser = (req, res) => {
  const { email, password, name, about, avatar } = req.body;

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
  User.findByIdAndUpdate(
    req.user._id,
    { name: escape(req.body.name), about: escape(req.body.about) },
    {
      new: true,
      runValidators: true
    }
  )
    .then(user => res.send({ data: user }))
    .catch(err => res.status(400).send({ message: err.message }));
};

module.exports.updateUserAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: escape(req.body.avatar) },
    {
      new: true,
      runValidators: true
    }
  )
    .then(user => res.send({ data: user }))
    .catch(err => res.status(400).send({ message: err.message }));
};
