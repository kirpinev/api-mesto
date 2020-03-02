const chalk = require('chalk');

const logger = (req, res, next) => {
  console.log(
    chalk.green.bold.inverse(`${new Date()}`, `${req.method}`, `${req.url}`)
  );

  next();
};

module.exports = logger;
