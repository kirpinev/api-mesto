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
  verifyCardObjectId,
  verifyUserObjectId
} = require('../middlewares/objectId');

router.use(auth);

router.get('/', getCards);

router.post('/', verifyUserObjectId, createCard);

router.delete('/:id', verifyCardObjectId, deleteCard);
router.delete('/:id/likes', verifyCardObjectId, dislikeCard);

router.put('/:id/likes', verifyCardObjectId, likeCard);

module.exports = router;
