const router = require('express').Router();

const cards = require('../data/cards.json');

router.get('/cards', (req, res) => {
  res.json(cards);
});

module.exports = router;
