const router = require('express').Router();

const { createUser } = require('../controllers/users');
const { checkRegistrationFields } = require('../middlewares/field');

router.post('/', checkRegistrationFields, createUser);

module.exports = router;
