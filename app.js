require('dotenv').config();
const express = require('express');
const chalk = require('chalk');
const mongoose = require('mongoose');

const middlewares = require('./middlewares/index');
const routers = require('./routes/index');
const { errorHandler } = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.use(middlewares);
app.use(routers);
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(chalk.blue.bold.inverse(`Слушаем порт ${PORT}`))
);
