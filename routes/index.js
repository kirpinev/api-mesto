const router = require('express').Router();

const registration = require('./registration');
const authorization = require('./authorization');
const users = require('./users');
const cards = require('./cards');
const error = require('./error');

router.use('/signup', registration);
router.use('/signin', authorization);
router.use('/users', users);
router.use('/cards', cards);
router.use('*', error);

module.exports = router;
