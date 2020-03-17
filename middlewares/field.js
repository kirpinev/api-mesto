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
