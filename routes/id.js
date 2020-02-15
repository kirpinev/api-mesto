const router = require('express').Router();

const users = require('../data/user.json');

router.get('/users/:id', (req, res) => {
  const userId = req.params.id;

  const userIsFind = users.find(user => user._id === userId);

  if (userIsFind) res.send(userIsFind);
  else res.status(404).send({ message: 'Нет пользователя с таким id' });
});

module.exports = router;
