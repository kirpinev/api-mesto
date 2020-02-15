// Ипортируем express
const express = require('express');

// Импортируем path для работы с путями
const path = require('path');

// Настраиваем порт
const { PORT = 3000 } = process.env;

// Запускаем приложение
const app = express();

// Импортируем рутер для пути /users
const users = require('./routes/users');

// Импортируем рутер для пути /users/:id
const id = require('./routes/id');

// Импортируем рутер для пути /cards
const cards = require('./routes/cards');

// Импортируем рутер для несуществующего адреса
const error = require('./routes/error');

//  Отправляем пользователю статические файлы
app.use(express.static(path.join(__dirname, 'public')));

//  Отправляем весь список пользователей
app.use(users);

//  Отправляем карточки
app.use(cards);

// Отправляем JSON пользователя
app.use(id);

// Отправляем ответ на несуществующую страницу
app.use(error);

// Слушаем порт 3000
app.listen(PORT, () => {
  console.log(`Слушаем порт ${PORT}`);
});
