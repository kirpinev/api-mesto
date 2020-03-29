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
const { verifyUserObjectId } = require('../middlewares/object-id');
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
  celebrate({ params: objectIdSchema }),
  deleteCard
);
router.delete(
  '/:id/likes',
  verifyUserObjectId,
  celebrate({ params: objectIdSchema }),
  dislikeCard
);

router.put(
  '/:id/likes',
  verifyUserObjectId,
  celebrate({ params: objectIdSchema }),
  likeCard
);

module.exports = router;
