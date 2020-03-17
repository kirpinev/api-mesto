module.exports.checkLoginFields = (req, res, next) => {
  const { email, password } = req.body;

  if (email === undefined || password === undefined) {
    res
      .status(400)
      .send({ message: 'Необходимо передать оба поля email и password' });
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
      message:
        'Необходимо передать все поля (email, password, name, about, avatar)'
    });
  } else if (password.length < 8) {
    res
      .status(400)
      .send({ message: 'Длина пароля должна быть минимум 8 символов' });
  } else {
    next();
  }
};
