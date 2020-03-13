const router = require('express').Router();

const { createUser } = require('../controllers/users');

router.post('/', createUser);

module.exports = router;
