require('dotenv').config();
const express = require('express');
const chalk = require('chalk');
const mongoose = require('mongoose');

const routers = require('./routes/index');

const {
  PORT = 3000,
  DATABASE_URL = 'mongodb://localhost:27017/mestodb'
} = process.env;
const app = express();

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.use(routers);

app.listen(PORT, () =>
  console.log(chalk.blue.bold.inverse(`Слушаем порт ${PORT}`))
);
