const router = require('express').Router();

const limiter = require('./limiter');
const logger = require('./logger');
const helmet = require('./helmet');
const bodyParser = require('./body-parser');
const cookieParser = require('./cookie-parser');

router.use(logger);
router.use(limiter);
router.use(helmet);
router.use(bodyParser);
router.use(cookieParser);

module.exports = router;
