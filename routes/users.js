// eslint-disable-next-line node/no-unsupported-features/node-builtins
const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const {
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar
} = require('../controllers/users');

const {
  verifyUserObjectIdAndCompareWithCardId,
  verifyUserObjectId
} = require('../middlewares/objectId');

router.use(auth);

router.get('/', getUsers);
router.get('/:id', verifyUserObjectId, getUserById);

router.patch('/:id', verifyUserObjectIdAndCompareWithCardId, updateUser);
router.patch(
  '/:id/avatar',
  verifyUserObjectIdAndCompareWithCardId,
  updateUserAvatar
);

module.exports = router;
