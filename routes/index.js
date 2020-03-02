const router = require('express').Router();

const users = require('./users');
const cards = require('./cards');
const error = require('./error');

router.use('/users', users);
router.use('/cards', cards);
router.use('*', error);

module.exports = router;
