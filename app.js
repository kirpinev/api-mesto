const express = require('express');

const path = require('path');

const { PORT = 3000 } = process.env;

const app = express();

const users = require('./routes/users');

const cards = require('./routes/cards');

const error = require('./routes/error');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);

app.use('/cards', cards);

app.use('*', error);

app.listen(PORT, () => {
  console.log(`Слушаем порт ${PORT}`);
});
