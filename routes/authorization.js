const { celebrate } = require('celebrate');
const router = require('express').Router();

const { login } = require('../controllers/users');
const { loginSchema } = require('../joi-shemas/index');

router.post('/', celebrate({ body: loginSchema }), login);

module.exports = router;
