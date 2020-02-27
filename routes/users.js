// eslint-disable-next-line node/no-unsupported-features/node-builtins
const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUserById);

router.post('/', createUser);

router.patch('/:id', updateUser);
router.patch('/:id/avatar', updateUserAvatar);

module.exports = router;
