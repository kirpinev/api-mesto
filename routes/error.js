const router = require('express').Router();
const { messages } = require('../utils/messages');

router.all('*', (req, res) => {
  res.status(404).send({ message: messages.root.isNotFound });
});

module.exports = router;
