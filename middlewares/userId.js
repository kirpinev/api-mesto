const userId = (req, res, next) => {
  req.user = {
    _id: '5e56964c1ffcc30d8f1c6300'
  };

  next();
};

module.exports = userId;
