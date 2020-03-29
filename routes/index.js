const { errors } = require('celebrate');
const router = require('express').Router();

const middlewares = require('../middlewares/index');
const { requestLogger, errorLogger } = require('../middlewares/logger');
const { errorHandler } = require('../middlewares/error-handler');

const registration = require('./registration');
const authorization = require('./authorization');
const users = require('./users');
const cards = require('./cards');
const error = require('./error');

router.use(requestLogger);
router.use(middlewares);

router.use('/signup', registration);
router.use('/signin', authorization);
router.use('/users', users);
router.use('/cards', cards);
router.use('*', error);

// логгер ошибок
router.use(errorLogger);

// обработка ошибок celebrate
router.use(errors());

// централизованный обработчик ошибок
router.use(errorHandler);

module.exports = router;
