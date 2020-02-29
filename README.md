# API для проекта Mesto v2.0.0

* [Как установить?](#установка)
* [За работу!](#работа)
  * [Запуск сервера](#запуск-сервера)
  * [Запуск сервера с хот релоудом](#запуск-сервера-с-хот-релоудом)
* [Функционал](#функционал)
  * [Пользователи](#пользователи)
    * [Получить список всех пользователей](#получить-список-всех-пользователей)
    * [Создать пользователя](#создать-пользователя)
    * [Получить пользователя по `_id`](#получить-пользователя-по-_id)
    * [Обновить поля `имя` и `о себе` своего профиля](#обновить-поля-имя-и-о-себе-своего-профиля)
    * [Обновить `аватар` своего профиля](#обновить-аватар-своего-профиля)
  * [Карточки](#карточки)
    * [Получить список всех карточек](#получить-список-всех-карточек)
    * [Создать карточку](#создать-карточку)
    * [Поставить лайк карточке по `_id`](#поставить-лайк-карточке-по-_id)
    * [Убрать лайк с карточки по `_id`](#убрать-лайк-с-карточки-по-_id)
    * [Удалить карточку по `_id`](#удалить-карточку-по-_id)
    

## Установка

Перед началом работы необходимо проверить наличие установленного node.js и npm

Скопируйте проект на компьютер:

```
git clone https://github.com/kirpinev/backend-mesto.git
```

Установите зависимости:

```
npm install
```

## Работа

Для локальной разработки с поднятием сервера используйте:

### Запуск сервера:

```
npm run start
```

### Запуск сервера с хот релоудом:

```
npm run dev
```

## Функционал

### Пользователи

#### Получить список всех пользователей

##### Запрос

`GET /users`

`curl -i -H 'Accept: application/json' http://localhost:3000/users`
    
##### Ответ

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 11
Date: Sat, 29 Feb 2020 10:50:52 GMT
Connection: keep-alive

{"data":[]}
```

#### Создать пользователя

##### Запрос

В теле POST-запроса на создание пользователя передайте JSON-объект с тремя полями: `name`, `about` и `avatar`:

`POST /users`

`curl -i -H 'Accept: application/json' -d 'name=Игорь&about=Космонавт&avatar=https://imgur.com/rKQoVXa' http://localhost:3000/users`

##### Ответ

```
HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8
Content-Length: 137
Date: Sat, 29 Feb 2020 11:11:59 GMT
Connection: keep-alive

{
  "data": [
    {
      "_id": "5e5a46ff8dcdd72581f080e9",
      "name": "Игорь",
      "about": "Космонавт",
      "avatar": "https://imgur.com/rKQoVXa",
      "__v": 0
    }
  ]
}
```

#### Получить пользователя по _id

##### Запрос

`GET /users/{user-id}`

`curl -i -H 'Accept: application/json' http://localhost:3000/users/5e5a46ff8dcdd72581f080e9`

##### Ответ

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 137
Date: Sat, 29 Feb 2020 11:18:36 GMT
Connection: keep-alive

{
  "data": [
    {
      "_id": "5e5a46ff8dcdd72581f080e9",
      "name": "Игорь",
      "about": "Космонавт",
      "avatar": "https://imgur.com/rKQoVXa",
      "__v": 0
    }
  ]
}
```

#### Обновить поля `имя` и `о себе` своего профиля

##### Запрос

`PATCH /users/me`

`curl -i -X PATCH -H "Content-Type: application/json" -d '{"name": "Стас", "about": "Программист"}' http://localhost:3000/users/me`

##### Ответ

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 139
Date: Sat, 29 Feb 2020 12:06:16 GMT
Connection: keep-alive

{
  "data": {
  "_id": "5e5a46ff8dcdd72581f080e9",
  "name": "Стас",
  "about": "Программист",
  "avatar": "https://imgur.com/rKQoVXa",
  "__v": 0
  }
}
```

#### Обновить `аватар` своего профиля

##### Запрос

`PATCH /users/me/avatar`

`curl -i -X PATCH -H "Content-Type: application/json" -d '{"avatar": "https://imgur.com/1F7BaKp"}' http://localhost:3000/users/me/avatar`

#### Ответ

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 139
Date: Sat, 29 Feb 2020 12:11:56 GMT
Connection: keep-alive

{
  "data": {
  "_id": "5e5a46ff8dcdd72581f080e9",
  "name": "Стас",
  "about": "Программист",
  "avatar": "https://imgur.com/1F7BaKp",
   "__v": 0
  }
}
```

### Карточки

#### Получить список всех карточек

##### Запрос

`GET /cards`

##### Ответ

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 11
ETag: W/"b-EFAlOux7Kcr/ZEgGkn2r+oFAbu4"
Date: Sat, 29 Feb 2020 11:26:20 GMT
Connection: keep-alive

{"data":[]}
```

#### Создать карточку

##### Запрос

В теле POST-запроса на создание карточки передайте JSON-объект с двумя полями: `name` и `link`:

`POST /cards`

`curl -i -H 'Accept: application/json' -d 'name=Луна&link=https://imgur.com/mcm6rAg' http://localhost:3000/cards`

##### Ответ

```
HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8
Content-Length: 189
Date: Sat, 29 Feb 2020 11:33:08 GMT
Connection: keep-alive

{
  "data": [
    {
      "likes": [],
      "_id": "5e5a4bf48dcdd72581f080ea",
      "name": "Луна",
      "link": "https://imgur.com/mcm6rAg",
      "owner": "5e5a46ff8dcdd72581f080e9",
      "createdAt": "2020-02-29T11:33:08.509Z",
      "__v": 0
    }
  ]
}
```
#### Поставить лайк карточке по _id

##### Запрос

`PUT /cards/{card-id}/likes`

`curl -i -X PUT -d "" http://localhost:3000/cards/5e5a5657fabefd2ae4cb2697/likes`

##### Ответ

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 215
Date: Sat, 29 Feb 2020 12:21:54 GMT
Connection: keep-alive

{
  "data": {
    "likes": [
      "5e5a46ff8dcdd72581f080e9"
    ],
    "_id": "5e5a5657fabefd2ae4cb2697",
    "name": "Луна",
    "link": "https://imgur.com/mcm6rAg",
    "owner": "5e5a46ff8dcdd72581f080e9",
    "createdAt": "2020-02-29T12:17:27.366Z",
    "__v": 0
  }
}
```

#### Убрать лайк с карточки по _id

##### Запрос

`DELETE /cards/{card-id}/likes`

`curl -i -X DELETE -d "" http://localhost:3000/cards/5e5a5657fabefd2ae4cb2697/likes`

##### Ответ

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 189
Date: Sat, 29 Feb 2020 12:26:54 GMT
Connection: keep-alive

{
  "data": {
    "likes": [],
    "_id": "5e5a5657fabefd2ae4cb2697",
    "name": "Луна",
    "link": "https://imgur.com/mcm6rAg",
    "owner": "5e5a46ff8dcdd72581f080e9",
    "createdAt": "2020-02-29T12:17:27.366Z",
    "__v": 0
  }
}
```

#### Удалить карточку по _id

##### Запрос

`DELETE /cards/{card-id}`

`curl -i -H 'Accept: application/json' -X DELETE http://localhost:3000/cards/5e5a4bf48dcdd72581f080ea`

##### Ответ

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 189
Date: Sat, 29 Feb 2020 11:44:01 GMT
Connection: keep-alive

{
  "data": [
    {
      "likes": [],
      "_id": "5e5a4bf48dcdd72581f080ea",
      "name": "Луна",
      "link": "https://imgur.com/mcm6rAg",
      "owner": "5e5a46ff8dcdd72581f080e9",
      "createdAt": "2020-02-29T11:33:08.509Z",
      "__v": 0
    }
  ]
}
```
