const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
} = require('../controllers/cards');

router.use(auth);

router.get('/', getCards);

router.post('/', createCard);

router.delete('/:id', deleteCard);
router.delete('/:id/likes', dislikeCard);

router.put('/:id/likes', likeCard);

module.exports = router;
