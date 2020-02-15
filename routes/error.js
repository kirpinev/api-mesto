const router = require('express').Router();

router.get('*', (req, res) => {
  res.send({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = router;
