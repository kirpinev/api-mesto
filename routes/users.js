const router = require('express').Router();

const users = require('../data/user.json');

router.get('/', (req, res) => res.json(users));

router.get('/:id', (req, res) => {
  const userId = req.params.id;

  // eslint-disable-next-line no-underscore-dangle
  const userIsFind = users.find(user => user._id === userId);

  if (userIsFind) {
    return res.json(userIsFind);
  }

  return res.status(404).json({ message: 'Нет пользователя с таким id' });
});

module.exports = router;
