const router = require('express').Router();

const limiter = require('./limiter');
const helmet = require('./helmet');
const bodyParser = require('./body-parser');
const cookieParser = require('./cookie-parser');

router.use(limiter);
router.use(helmet);
router.use(bodyParser);
router.use(cookieParser);

module.exports = router;
