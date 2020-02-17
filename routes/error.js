const router = require('express').Router();

router.all('', (req, res) =>
  res.status(404).json({ message: 'Запрашиваемый ресурс не найден' })
);

module.exports = router;
