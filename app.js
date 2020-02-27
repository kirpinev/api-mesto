const express = require('express');
const chalk = require('chalk');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const logger = require('./middlewares/logger');
const userId = require('./middlewares/userId');

const users = require('./routes/users');
const cards = require('./routes/cards');
const error = require('./routes/error');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.use(logger);
app.use(userId);
app.use('/users', users);
app.use('/cards', cards);
app.use(error);

app.listen(PORT, () => {
  console.log(chalk.blue.bold.inverse(`Слушаем порт ${PORT}`));
});
