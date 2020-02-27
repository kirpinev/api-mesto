const chalk = require('chalk');
const router = require('express').Router();

router.all('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
  console.log(
    chalk.red.bold.inverse(`Запрашиваемый ресурс ${req.url} не найден`)
  );
});

module.exports = router;
