const bcrypt = require('bcryptjs');
const escape = require('escape-html');
const User = require('../models/user');
const { createToken } = require('../utils/token');
const { messages } = require('../utils/messages');
const { NotFoundError, BadRequestError } = require('../errors');

module.exports.login = (req, res, next) =>
  User.findUserByCredentials(req.body.email, req.body.password)
    .then(user => {
      const token = createToken(user);

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true
      });

      res.status(200).send({ message: messages.authorization.isSuccessful });
    })
    .catch(next);

module.exports.getUsers = (req, res, next) =>
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(next);

module.exports.getUserById = (req, res, next) =>
  User.findById(req.params.id)
    .orFail(() => new NotFoundError(messages.user.id.isNotFound))
    .then(user => {
      res.send({ data: user });
    })
    .catch(next);

module.exports.createUser = (req, res, next) =>
  bcrypt.hash(req.body.password, 10).then(hash =>
    User.create({
      email: req.body.email,
      password: `${hash}`,
      name: escape(req.body.name),
      about: escape(req.body.about),
      avatar: escape(req.body.avatar)
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
      .catch(err => next(new BadRequestError(err.message)))
  );

module.exports.updateUser = (req, res, next) =>
  User.findByIdAndUpdate(
    req.user._id,
    { name: escape(req.body.name), about: escape(req.body.about) },
    {
      new: true,
      runValidators: true
    }
  )
    .then(user => res.send({ data: user }))
    .catch(err => next(new BadRequestError(err.message)));

module.exports.updateUserAvatar = (req, res, next) =>
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: escape(req.body.avatar) },
    {
      new: true,
      runValidators: true
    }
  )
    .then(user => res.send({ data: user }))
    .catch(err => next(new BadRequestError(err.message)));
