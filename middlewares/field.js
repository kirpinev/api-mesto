const { messages } = require('../utils/messages');

module.exports.checkLoginFields = (req, res, next) => {
  const { email, password } = req.body;

  if (email === undefined || password === undefined) {
    res
      .status(400)
      .send({ message: messages.authorization.allFields.isRequired });
  } else {
    next();
  }
};

module.exports.checkRegistrationFields = (req, res, next) => {
  const { email, password, name, about, avatar } = req.body;

  if (
    email === undefined ||
    password === undefined ||
    name === undefined ||
    about === undefined ||
    avatar === undefined
  ) {
    res.status(400).send({
      message: messages.registration.allFields.isRequired
    });
  } else if (password.length < 8) {
    res.status(400).send({ message: messages.registration.password.tooShort });
  } else {
    next();
  }
};
