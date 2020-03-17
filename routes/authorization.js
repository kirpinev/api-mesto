const router = require('express').Router();

const { login } = require('../controllers/users');
const { checkLoginFields } = require('../middlewares/field');

router.post('/', checkLoginFields, login);

module.exports = router;
