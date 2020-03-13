// eslint-disable-next-line node/no-unsupported-features/node-builtins
const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
  login
} = require('../controllers/users');

router.post('/signup', createUser);
router.post('/signin', login);

router.use(auth);

router.get('/', getUsers);
router.get('/:id', getUserById);

router.patch('/:id', updateUser);
router.patch('/:id/avatar', updateUserAvatar);

module.exports = router;
