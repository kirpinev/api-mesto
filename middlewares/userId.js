const userId = (req, res, next) => {
  req.user = {
    _id: '5e5a46ff8dcdd72581f080e9'
  };

  next();
};

module.exports = userId;
