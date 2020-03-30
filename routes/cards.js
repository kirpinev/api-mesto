const { celebrate } = require('celebrate');
const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
} = require('../controllers/cards');
const {
  verifyUserObjectId,
  verifyCardObjectId
} = require('../middlewares/object-id');
const { objectIdSchema, cardSchema } = require('../joi-shemas/index');

router.use(auth);

router.get('/', verifyUserObjectId, getCards);

router.post(
  '/',
  verifyUserObjectId,
  celebrate({ body: cardSchema }),
  createCard
);

router.delete(
  '/:id',
  verifyUserObjectId,
  verifyCardObjectId,
  celebrate({ params: objectIdSchema }),
  deleteCard
);
router.delete(
  '/:id/likes',
  verifyUserObjectId,
  verifyCardObjectId,
  celebrate({ params: objectIdSchema }),
  dislikeCard
);

router.put(
  '/:id/likes',
  verifyUserObjectId,
  verifyCardObjectId,
  celebrate({ params: objectIdSchema }),
  likeCard
);

module.exports = router;
