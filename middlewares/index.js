const router = require('express').Router();

const limiter = require('../middlewares/limiter');
const logger = require('../middlewares/logger');
const helmet = require('../middlewares/helmet');
const bodyParser = require('../middlewares/bodyParser');
const cookieParser = require('../middlewares/cookieParser');

router.use(logger);
router.use(limiter);
router.use(helmet);
router.use(bodyParser);
router.use(cookieParser);

module.exports = router;
