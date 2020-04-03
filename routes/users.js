// eslint-disable-next-line node/no-unsupported-features/node-builtins
const { celebrate } = require('celebrate');
const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const {
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');
const {
  compareUserObjectIdAndCardId,
  verifyUserObjectId,
} = require('../middlewares/object-id');
const {
  objectIdSchema,
  userInfoSchema,
  userAvatarSchema,
} = require('../joi-shemas/index');

router.use(auth);

router.get('/', getUsers);
router.get('/:id', celebrate({ params: objectIdSchema }), getUserById);

router.patch(
  '/:id',
  celebrate({
    params: objectIdSchema,
    body: userInfoSchema,
  }),
  verifyUserObjectId,
  compareUserObjectIdAndCardId,
  updateUser
);
router.patch(
  '/:id/avatar',
  celebrate({
    params: objectIdSchema,
    body: userAvatarSchema,
  }),
  verifyUserObjectId,
  compareUserObjectIdAndCardId,
  updateUserAvatar
);

module.exports = router;
