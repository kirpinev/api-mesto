# backend-mesto v2.0.0

### API для проекта Mesto 

* [Как установить?](#установка)
* [За работу!](#работа)
  * [Запуск сервера](#запуск-сервера)
  * [Запуск сервера с хот релоудом](#запуск-сервера-с-хот-релоудом)
* [Регистрация](#регистация)
* [Авторизация](#авторизация)
* [Функционал](#функционал)
  * [Пользователи](#пользователи)
    * [Получение списка всех пользователей](#получение-списка-всех-пользователей)
    * [Получение пользователя по `_id`](#получение-пользователя-по-_id)
    * [Обновление поля `имя` и `о себе` своего профиля](#обновление-поля-имя-и-о-себе-своего-профиля)
    * [Обновление `аватара` своего профиля](#обновление-аватара-своего-профиля)
  * [Карточки](#карточки)
    * [Получение списка всех карточек](#получение-списка-всех-карточек)
    * [Создание карточки](#создание-карточки)
    * [Добавление лайка карточке по `_id`](#добавление-лайка-карточке-по-_id)
    * [Удаление лайка с карточки по `_id`](#удаление-лайка-с-карточки-по-_id)
    * [Удаление карточки по `_id`](#удаление-карточки-по-_id)
 * [Обработка ошибок](#обработка-ошибок)
    * [Получение пользователя по несуществующему `_id`](#получение-пользователя-по-несуществующему-_id)
    * [Получение пользователя по невалидному `_id`](#получение-пользователя-по-невалидному-_id)
    * [Регистрация пользователя с невалидными полями](#регистрация-пользователя-с-невалидными-полями)
    * [Обновление аватара своего профиля с невалидной ссылкой](#обновление-аватара-своего-профиля-с-невалидной-ссылкой)
    * [Создание карточки c невалидными параметрами `name` и `link`](#создание-карточки-c-невалидными-параметрами-name-и-link)
    * [Удаление чужой карточки по валидному `_id`](#удаление-чужой-карточки-по-валидному-_id)
    * [Удаление чужой карточки по невалидному `_id`](#удаление-чужой-карточки-по-невалидному-_id)
    * [Удаление карточки по несуществующему `_id`](#удаление-карточки-по-несуществующему-_id)
    * [Удаление карточки по невалидному `_id`](#удаление-карточки-по-невалидному-_id)
    * [Удаление лайка с карточки по несуществующему `_id`](#удаление-лайка-с-карточки-по-несуществующему-_id)
    * [Удаление лайка с карточки по невалидному `_id`](#удаление-лайка-с-карточки-по-невалидному-_id)

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

**По дефолту сервер запустится _на 3000 порту_**

## Регистация

`POST /signup`

###### Тело запроса

| Параметры | Обязателен/Опционален | Описание | Тип | Критерии |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| **email** | Обязательно | Почта пользователя | String | Должна быть валидной почтой | 
| **password** | Обязательно | Пароль пользователя | String | Длина: minlength 8 |
| **name** | Обязательно | Инициалы пользователя | String | Длина: minlength 2, maxlength 30 | 
| **about** | Обязательно | Информация пользователя о себе | String | Длина: minlength 2, maxlength 30 | 
| **avatar** | Обязательно | Ссылка на картинку для аватара пользователя | String | Должна быть валидной ссылкой | 

###### Пример запроса

`curl -i -X POST -H "Content-Type: application/json" -d '{"email": "igor@tormail.org", "password": "12345678", "name": "Игорь", "about": "Космонавт", "avatar": "https://imgur.com/1F7BaKp"}' http://localhost:3000/signup`

##### Пример ответа

```
HTTP/1.1 201 Created
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 90
Date: Sat, 29 Feb 2020 11:11:59 GMT
X-RateLimit-Reset: 1584187985
X-DNS-Prefetch-Control: off
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Download-Options: noopen
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Content-Type: application/json; charset=utf-8
Content-Length: 123
Connection: keep-alive

{
  "data": [
    {
      "_id": "5e5a46ff8dcdd72581f080e9",
      "email": "igor@tormail.org",
      "name": "Игорь",
      "about": "Космонавт",
      "avatar": "https://imgur.com/rKQoVXa",
      "__v": 0
    }
  ]
}
```

##### Значения тела ответа

| Параметры | Описание | Тип |
| ------------- | ------------- | ------------- |
| **_id** | Уникальный идентификатор документа пользователя, генерирутся автоматически | String |
| **email** | Почта пользователя | String |
| **name** | Инициалы пользователя | String |
| **about** | Информация пользователя о себе | Number |
| **avatar** | Ссылка на картинку для аватара пользователя | Number |
| **__v** | Версионный ключ, набор свойств для каждого документа | Number |

## Авторизация

`POST /signin`

###### Тело запроса

| Параметры | Обязателен/Опционален | Описание | Тип | Критерии |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| **email** | Обязательно | Почта пользователя | String | Должна быть валидной почтой | 
| **password** | Обязательно | Пароль пользователя | String | Длина: minlength 8 |

###### Пример запроса

`curl -i -X POST -H "Content-Type: application/json" -d '{"email": "igor@tormail.org", "password": "12345678"}' http://localhost:3000/signin`

##### Пример ответа

```
HTTP/1.1 200 OK
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
Date: Sat, 29 Feb 2020 11:13:57 GMT
X-RateLimit-Reset: 1584188885
X-DNS-Prefetch-Control: off
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Download-Options: noopen
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Set-Cookie: jwt=secret-key; Max-Age=604800; Path=/; Expires=Sat, 6 Mar 2020 11:13:57 GMT; HttpOnly; SameSite=Strict
Content-Type: application/json; charset=utf-8
Content-Length: 54
Connection: keep-alive

{ 
  "message": "Вход успешно выполнен"
}
```

После успешного входа вернется куки `Set-Cookie: jwt=secret-key; Max-Age=604800; Path=/; Expires=Sat, 6 Mar 2020 11:13:57 GMT; HttpOnly; SameSite=Strict`. Все последующие запросы для авторизации будут требовать эту куки. 

## Функционал

### Пользователи

#### Получение списка всех пользователей

`GET /users`

##### Пример запроса

`curl -b 'jwt=secret-key' -i -H 'Accept: application/json' http://localhost:3000/users`
    
##### Пример ответа

```
HTTP/1.1 200 OK
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 98
Date: Sat, 29 Feb 2020 10:50:52 GMT
X-RateLimit-Reset: 1584189785
X-DNS-Prefetch-Control: off
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Download-Options: noopen
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Content-Type: application/json; charset=utf-8
Content-Length: 4113
Connection: keep-alive

{"data":[]}
```

##### Значения тела ответа

Если в коллекции нет ни одного документа, то вернется пустой массив.

#### Получение пользователя по _id

`GET /users/{user-id}`

##### Параметры пути

| Параметры | Описание |
| ------------- | ------------- |
| **{user-id}** | Уникальный идентификатор документа пользователя |

##### Пример запроса

`curl -b 'jwt=secret-key' -i -H 'Accept: application/json' http://localhost:3000/users/5e5a46ff8dcdd72581f080e9`

##### Пример ответа

```
HTTP/1.1 200 OK
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 98
Date: Sat, 29 Feb 2020 11:18:36 GMT
X-RateLimit-Reset: 1584189785
X-DNS-Prefetch-Control: off
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Download-Options: noopen
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Content-Type: application/json; charset=utf-8
Content-Length: 4113
Connection: keep-alive

{
  "data": [
    {
      "_id": "5e5a46ff8dcdd72581f080e9",
      "email": "igor@tormail.org",
      "name": "Игорь",
      "about": "Космонавт",
      "avatar": "https://imgur.com/rKQoVXa",
      "__v": 0
    }
  ]
}
```

##### Значения тела ответа

| Параметры | Описание | Тип |
| ------------- | ------------- | ------------- |
| **_id** | Уникальный идентификатор документа пользователя, генерирутся автоматически | String |
| **email** | Почта пользователя | String |
| **name** | Инициалы пользователя | String |
| **about** | Информация пользователя о себе | Number |
| **avatar** | Ссылка на картинку для аватара пользователя | Number |
| **__v** | Версионный ключ, набор свойств для каждого документа | Number |

#### Обновление поля `имя` и `о себе` своего профиля

`PATCH /users/{user-id}`

##### Параметры пути

| Параметры | Описание |
| ------------- | ------------- |
| **{user-id}** | Уникальный идентификатор документа пользователя |

###### Тело запроса

| Параметры | Обязателен/Опционален | Описание | Тип | Критерии |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| **name**  | Обязательно | Инициалы пользователя | String | Длина: minlength 2, maxlength 30 | 
| **about**  | Обязательно | Информация пользователя о себе | String | Длина: minlength 2, maxlength 30 | 

##### Пример запроса

`curl -b 'jwt=secret-key' -i -X PATCH -H "Content-Type: application/json" -d '{"name": "Стас", "about": "Программист"}' http://localhost:3000/users/5e5a46ff8dcdd72581f080e9`

##### Пример ответа

```
HTTP/1.1 200 OK
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 98
Date: Sat, 29 Feb 2020 12:06:16 GMT
X-RateLimit-Reset: 1584189785
X-DNS-Prefetch-Control: off
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Download-Options: noopen
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Content-Type: application/json; charset=utf-8
Content-Length: 4113
Connection: keep-alive

{
  "data": {
  "_id": "5e5a46ff8dcdd72581f080e9",
  "email": "igor@tormail.com",
  "name": "Стас",
  "about": "Программист",
  "avatar": "https://imgur.com/rKQoVXa",
  "__v": 0
  }
}
```

##### Значения тела ответа

| Параметры | Описание | Тип |
| ------------- | ------------- | ------------- |
| **_id** | Уникальный идентификатор документа пользователя, генерирутся автоматически | String |
| **email** | Почта пользователя | String |
| **name** | Инициалы пользователя | String |
| **about** | Информация пользователя о себе | Number |
| **avatar** | Ссылка на картинку для аватара пользователя | Number |
| **__v** | Версионный ключ, набор свойств для каждого документа | Number |

#### Обновление `аватара` своего профиля

`PATCH /users/{id}/avatar`

##### Параметры пути

| Параметры | Описание |
| ------------- | ------------- |
| **{user-id}** | Уникальный идентификатор документа пользователя |

###### Тело запроса

| Параметры | Обязателен/Опционален | Описание | Тип | Критерии |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| **avatar**  | Обязательно  | Ссылка на картинку для аватара пользователя | String | Должна быть валидной ссылкой | 

##### Пример запроса

`curl -b 'jwt=secret-key' -i -X PATCH -H "Content-Type: application/json" -d '{"avatar": "https://imgur.com/1F7BaKp"}' http://localhost:3000/users/me/avatar`

#### Пример ответа

```
HTTP/1.1 200 OK
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 98
Date: Sat, 29 Feb 2020 12:11:56 GMT
X-RateLimit-Reset: 1584189785
X-DNS-Prefetch-Control: off
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Download-Options: noopen
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Content-Type: application/json; charset=utf-8
Content-Length: 4113
Connection: keep-alive

{
  "data": {
  "_id": "5e5a46ff8dcdd72581f080e9",
  "email": "igor@tormail.com",
  "name": "Стас",
  "about": "Программист",
  "avatar": "https://imgur.com/1F7BaKp",
   "__v": 0
  }
}
```

##### Значения тела ответа

| Параметры | Описание | Тип |
| ------------- | ------------- | ------------- |
| **_id** | Уникальный идентификатор документа пользователя, генерирутся автоматически | String |
| **email** | Почта пользователя | String |
| **name** | Инициалы пользователя | String |
| **about** | Информация пользователя о себе | Number |
| **avatar** | Ссылка на картинку для аватара пользователя | Number |
| **__v** | Версионный ключ, набор свойств для каждого документа | Number |

### Карточки

#### Получение списка всех карточек

`GET /cards`

#### Пример запроса

`curl -b 'jwt=secret-key' -i -H 'Accept: application/json' http://localhost:3000/cards`

##### Пример ответа

```
HTTP/1.1 200 OK
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 98
Date: Sat, 29 Feb 2020 11:26:20 GMT
X-RateLimit-Reset: 1584189785
X-DNS-Prefetch-Control: off
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Download-Options: noopen
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Content-Type: application/json; charset=utf-8
Content-Length: 4113
Connection: keep-alive

{
  "data":[]
}
```

##### Значения тела ответа

Если в коллекции нет ни одного документа, то вернется пустой массив.

#### Создание карточки

`POST /cards`

###### Тело запроса

| Параметры | Обязателен/Опционален | Описание | Тип | Критерии |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| **name**  | Обязательно  | Название карточки | String | Длина: minlength 2, maxlength 30 | 
| **link**  | Обязательно  | Ссылка на картинку для карточки | String | Должна быть валидной ссылкой | 

#### Пример запроса

`curl -b 'jwt=secret-key' -i -H 'Accept: application/json' -d 'name=Луна&link=https://imgur.com/mcm6rAg' http://localhost:3000/cards`

##### Пример ответа

```
HTTP/1.1 201 OK
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 98
Date: Sat, 29 Feb 2020 11:33:08 GMT
X-RateLimit-Reset: 1584189785
X-DNS-Prefetch-Control: off
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Download-Options: noopen
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Content-Type: application/json; charset=utf-8
Content-Length: 4113
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
##### Значения тела ответа

| Параметры | Описание | Тип |
| ------------- | ------------- | ------------- |
| **likes** | Массив, содержащий уникальные идентификаторы пользователей лайкнувших карточку | Array |
| **_id** | Уникальный идентификатор документа карточки, генерирутся автоматически | String |
| **name** | Название карточки | String |
| **link** | Ссылка на картинку для карточки | String |
| **owner** | Уникальный идентификатор пользователя создавшего карточку | String |
| **createdAt** | Дата и время создания карточки | String |
| **__v** | Версионный ключ, набор свойств для каждого документа | Number |

#### Добавление лайка карточке по `_id`

`PUT /cards/{card-id}/likes`

##### Параметры пути

| Параметры | Описание |
| ------------- | ------------- |
| **{card-id}** | Уникальный идентификатор документа карточки |

#### Пример запроса

`curl -b 'jwt=secret-key' -i -X PUT -d "" http://localhost:3000/cards/5e5a5657fabefd2ae4cb2697/likes`

##### Пример ответа

```
HTTP/1.1 200 OK
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 98
Date: Sat, 29 Feb 2020 12:21:54 GMT
X-RateLimit-Reset: 1584189785
X-DNS-Prefetch-Control: off
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Download-Options: noopen
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Content-Type: application/json; charset=utf-8
Content-Length: 4113
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

##### Значения тела ответа

| Параметры | Описание | Тип |
| ------------- | ------------- | ------------- |
| **likes** | Массив, содержащий уникальные идентификаторы пользователей лайкнувших карточку | Array |
| **_id** | Уникальный идентификатор документа карточки, генерирутся автоматически | String |
| **name** | Название карточки | String |
| **link** | Ссылка на картинку для карточки | String |
| **owner** | Уникальный идентификатор пользователя создавшего карточку | String |
| **createdAt** | Дата и время создания карточки | String |
| **__v** | Версионный ключ, набор свойств для каждого документа | Number |

#### Удаление лайка с карточки по `_id`

`DELETE /cards/{card-id}/likes`

##### Параметры пути

| Параметры | Описание |
| ------------- | ------------- |
| **{card-id}** | Уникальный идентификатор документа карточки |

#### Пример запроса

`curl -b 'jwt=secret-key' -i -X DELETE -d "" http://localhost:3000/cards/5e5a5657fabefd2ae4cb2697/likes`

##### Пример ответа

```
HTTP/1.1 200 OK
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 98
Date: Sat, 29 Feb 2020 12:26:54 GMT
X-RateLimit-Reset: 1584189785
X-DNS-Prefetch-Control: off
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Download-Options: noopen
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Content-Type: application/json; charset=utf-8
Content-Length: 4113
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

##### Значения тела ответа

| Параметры | Описание | Тип |
| ------------- | ------------- | ------------- |
| **likes** | Массив, содержащий уникальные идентификаторы пользователей лайкнувших карточку | Array |
| **_id** | Уникальный идентификатор документа карточки, генерирутся автоматически | String |
| **name** | Название карточки | String |
| **link** | Ссылка на картинку для карточки | String |
| **owner** | Уникальный идентификатор пользователя создавшего карточку | String |
| **createdAt** | Дата и время создания карточки | String |
| **__v** | Версионный ключ, набор свойств для каждого документа | Number |

#### Удаление карточки по `_id`

`DELETE /cards/{card-id}`

##### Параметры пути

| Параметры | Описание |
| ------------- | ------------- |
| **{card-id}** | Уникальный идентификатор документа карточки |

#### Пример запроса

`curl -b 'jwt=secret-key' -i -H 'Accept: application/json' -X DELETE http://localhost:3000/cards/5e5a4bf48dcdd72581f080ea`

##### Пример ответа

```
HTTP/1.1 200 OK
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 98
Date: Sat, 29 Feb 2020 11:44:01 GMT
X-RateLimit-Reset: 1584189785
X-DNS-Prefetch-Control: off
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Download-Options: noopen
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Content-Type: application/json; charset=utf-8
Content-Length: 4113
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

##### Значения тела ответа

| Параметры | Описание | Тип |
| ------------- | ------------- | ------------- |
| **likes** | Массив, содержащий уникальные идентификаторы пользователей лайкнувших карточку | Array |
| **_id** | Уникальный идентификатор документа карточки, генерирутся автоматически | String |
| **name** | Название карточки | String |
| **link** | Ссылка на картинку для карточки | String |
| **owner** | Уникальный идентификатор пользователя создавшего карточку | String |
| **createdAt** | Дата и время создания карточки | String |
| **__v** | Версионный ключ, набор свойств для каждого документа | Number |


## Обработка ошибок

### Пользователи

#### Получение пользователя по несуществующему `_id`

`GET /users/{user-id}`

##### Параметры пути

| Параметры | Описание |
| ------------- | ------------- |
| **{user-id}** | Уникальный идентификатор документа пользователя |


##### Пример запроса

`curl -b 'jwt=secret-key' -i -H 'Accept: application/json' http://localhost:3000/users/8340d0ec33270a25f2413b69`

##### Пример ответа

```
HTTP/1.1 404 Not Found
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 98
Date: Sat, 29 Feb 2020 16:08:19 GMT
X-RateLimit-Reset: 1584189785
X-DNS-Prefetch-Control: off
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Download-Options: noopen
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Content-Type: application/json; charset=utf-8
Content-Length: 4113
Connection: keep-alive

{
  "message": "id пользователя не найден"
}
```

##### Значения тела ответа

| Параметры | Описание | Тип |
| ------------- | ------------- | ------------- |
| **message** | Детали ошибки | String |

#### Получение пользователя по невалидному `_id`

`GET /users/{user-id}`

##### Параметры пути

| Параметры | Описание |
| ------------- | ------------- |
| **{user-id}** | Уникальный идентификатор документа пользователя |


##### Пример запроса

`curl -b 'jwt=secret-key' -i -H 'Accept: application/json' http://localhost:3000/users/123`

##### Пример ответа

```
HTTP/1.1 400 Bad Request
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 98
Date: Sat, 29 Feb 2020 16:11:56 GMT
X-RateLimit-Reset: 1584189785
X-DNS-Prefetch-Control: off
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Download-Options: noopen
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Content-Type: application/json; charset=utf-8
Content-Length: 4113
Connection: keep-alive

{
  "message": "id пользователя не соответсвует стандарту"
}
```

##### Значения тела ответа

| Параметры | Описание | Тип |
| ------------- | ------------- | ------------- |
| **message** | Детали ошибки | String |

#### Регистрация пользователя с невалидными полями

`POST /signup`

###### Тело запроса

| Параметры | Обязателен/Опционален | Описание | Тип | Критерии |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| **email** | Обязательно | Почта пользователя | String | Должна быть валидной почтой | 
| **password** | Обязательно | Пароль пользователя | String | Длина: minlength 8 |
| **name** | Обязательно | Инициалы пользователя | String | Длина: minlength 2, maxlength 30 | 
| **about** | Обязательно | Информация пользователя о себе | String | Длина: minlength 2, maxlength 30 | 
| **avatar** | Обязательно | Ссылка на картинку для аватара пользователя | String | Должна быть валидной ссылкой | 

###### Пример запроса

`curl -b 'jwt=secret-key' -i -X POST -H "Content-Type: application/json" -d '{"email": "igor@", "password": "12345678", "name": "И", "about": "К", "avatar": "https"}' http://localhost:3000/signup`

##### Пример ответа

```
HTTP/1.1 400 Bad Request
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
Date: Sat, 29 Feb 2020 16:44:42 GMT
X-RateLimit-Reset: 1584191585
X-DNS-Prefetch-Control: off
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Download-Options: noopen
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Content-Type: application/json; charset=utf-8
Content-Length: 303
Connection: keep-alive

{
  "message": "user validation failed: email: Неправильный формат почты,
              name: Path `name` (`И`) is shorter than the minimum allowed length (2).,
              about: Path `about` (`К`) is shorter than the minimum allowed length (2).,
              avatar: Неправильный формат ссылки"
}
```

##### Значения тела ответа

| Параметры | Описание | Тип |
| ------------- | ------------- | ------------- |
| **message** | Детали ошибки | String |

#### Регистация пользователя с невалидным полем `password`

`POST /signup`

###### Тело запроса

| Параметры | Обязателен/Опционален | Описание | Тип | Критерии |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| **email** | Обязательно | Почта пользователя | String | Должна быть валидной почтой | 
| **password** | Обязательно | Пароль пользователя | String | Длина: minlength 8 |
| **name** | Обязательно | Инициалы пользователя | String | Длина: minlength 2, maxlength 30 | 
| **about** | Обязательно | Информация пользователя о себе | String | Длина: minlength 2, maxlength 30 | 
| **avatar** | Обязательно | Ссылка на картинку для аватара пользователя | String | Должна быть валидной ссылкой | 

###### Пример запроса

`curl -b 'jwt=secret-key' -i -X POST -H "Content-Type: application/json" -d '{"email": "igor@tormail.org", "password": "1234567", "name": "Игорь", "about": "Космонавт", "avatar": "https://imgur.com/1F7BaKp"}' http://localhost:3000/signup`

##### Пример ответа

```
HTTP/1.1 400 Bad Request
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 98
Date: Sat, 29 Feb 2020 16:46:42 GMT
X-RateLimit-Reset: 1584191585
X-DNS-Prefetch-Control: off
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Download-Options: noopen
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Content-Type: application/json; charset=utf-8
Content-Length: 93
Connection: keep-alive

{
  "message": "Длина пароля должна быть минимум 8 символов"
}
```

##### Значения тела ответа

| Параметры | Описание | Тип |
| ------------- | ------------- | ------------- |
| **message** | Детали ошибки | String |

#### Обновление `аватара` своего профиля с невалидной ссылкой

`PATCH /users/me/avatar`

###### Тело запроса

| Параметры | Обязателен/Опционален | Описание | Тип | Критерии |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| **avatar**  | Обязательно  | Ссылка на картинку для аватара пользователя | String | Должна быть валидной ссылкой | 

##### Пример запроса

`curl -b 'jwt=secret-key' -i -X PATCH -H "Content-Type: application/json" -d '{"avatar": "https:"}' http://localhost:3000/users/me/avatar`

#### Пример ответа

```
HTTP/1.1 400 Bad Request
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 98
Date: Sat, 29 Feb 2020 16:49:36 GMT
X-RateLimit-Reset: 1584191585
X-DNS-Prefetch-Control: off
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Download-Options: noopen
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Content-Type: application/json; charset=utf-8
Content-Length: 93
Connection: keep-alive

{
    "message": "Validation failed: avatar: Неправильный формат ссылки"
}
```

##### Значения тела ответа

| Параметры | Описание | Тип |
| ------------- | ------------- | ------------- |
| **message** | Детали ошибки | String |

### Карточки

#### Создание карточки c невалидными параметрами `name` и `link`

`POST /cards`

###### Тело запроса

| Параметры | Обязателен/Опционален | Описание | Тип | Критерии |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| **name**  | Обязательно  | Название карточки | String | Длина: minlength 2, maxlength 30 | 
| **link**  | Обязательно  | Ссылка на картинку для карточки | String | Должна быть валидной ссылкой | 

#### Пример запроса

`curl -b 'jwt=secret-key' -i -H 'Accept: application/json' -d 'name=Л&link=https:' http://localhost:3000/cards`

##### Пример ответа

```
HTTP/1.1 400 Bad Request
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 98
Date: Sat, 29 Feb 2020 16:39:02 GMT
X-RateLimit-Reset: 1584191585
X-DNS-Prefetch-Control: off
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Download-Options: noopen
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Content-Type: application/json; charset=utf-8
Content-Length: 93
Connection: keep-alive

{
  "message": "card validation failed: name: Path `name` (`Л`) is shorter than the minimum allowed length (2).,
              link: Неправильный формат ссылки"
}
```
##### Значения тела ответа

| Параметры | Описание | Тип |
| ------------- | ------------- | ------------- |
| **message** | Детали ошибки | String |

#### Удаление карточки по несуществующему `_id`

`DELETE /cards/{card-id}`

##### Параметры пути

| Параметры | Описание |
| ------------- | ------------- |
| **{card-id}** | Уникальный идентификатор документа карточки |

#### Пример запроса

`curl -b 'jwt=secret-key' -i -H 'Accept: application/json' -X DELETE http://localhost:3000/cards/5e57c2e44d08551b641f6c7a`

##### Пример ответа

```
HTTP/1.1 404 Not Found
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 98
Date: Sat, 29 Feb 2020 16:19:18 GMT
X-RateLimit-Reset: 1584191585
X-DNS-Prefetch-Control: off
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Download-Options: noopen
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Content-Type: application/json; charset=utf-8
Content-Length: 93
Connection: keep-alive

{
  "message": "нет карточки с таким id"
}
```

##### Значения тела ответа

| Параметры  | Описание | Тип |
| ------------- | ------------- | ------------- |
| **message** | Детали ошибки | String |

#### Удаление карточки по невалидному `_id`

`DELETE /cards/{card-id}`

##### Параметры пути

| Параметры | Описание |
| ------------- | ------------- |
| **{card-id}** | Уникальный идентификатор документа карточки |

#### Пример запроса

`curl -b 'jwt=secret-key' -i -H 'Accept: application/json' -X DELETE http://localhost:3000/cards/123`

##### Пример ответа

```
HTTP/1.1 400 Bad Request
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 98
Date: Sat, 29 Feb 2020 16:20:54 GMT
X-RateLimit-Reset: 1584191585
X-DNS-Prefetch-Control: off
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Download-Options: noopen
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Content-Type: application/json; charset=utf-8
Content-Length: 93
Connection: keep-alive

{
  "message": "id карточки не соответсвует стандарту"
}
```

##### Значения тела ответа

| Параметры | Описание | Тип |
| ------------- | ------------- | ------------- |
| **message** | Детали ошибки | String |

#### Удаление чужой карточки по валидному `_id`

`DELETE /cards/{card-id}`

##### Параметры пути

| Параметры | Описание |
| ------------- | ------------- |
| **{card-id}** | Уникальный идентификатор документа карточки |

#### Пример запроса

`curl -b 'jwt=secret-key' -i -H 'Accept: application/json' -X DELETE http://localhost:3000/cards/5e6b54e68f883f1cf6905886`

##### Пример ответа

```
HTTP/1.1 401 Unauthorized
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 98
Date: Sat, 29 Feb 2020 16:22:10 GMT
X-RateLimit-Reset: 1584191585
X-DNS-Prefetch-Control: off
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Download-Options: noopen
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Content-Type: application/json; charset=utf-8
Content-Length: 93
Connection: keep-alive

{
  "message": "Нужна авторизация"
}
```

##### Значения тела ответа

| Параметры | Описание | Тип |
| ------------- | ------------- | ------------- |
| **message** | Детали ошибки | String |

#### Удаление чужой карточки по невалидному `_id`

`DELETE /cards/{card-id}`

##### Параметры пути

| Параметры | Описание |
| ------------- | ------------- |
| **{card-id}** | Уникальный идентификатор документа карточки |

#### Пример запроса

`curl -b 'jwt=secret-key' -i -H 'Accept: application/json' -X DELETE http://localhost:3000/cards/123`

##### Пример ответа

```
HTTP/1.1 400 Bad Request
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 98
Date: Sat, 29 Feb 2020 16:40:10 GMT
X-RateLimit-Reset: 1584191585
X-DNS-Prefetch-Control: off
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Download-Options: noopen
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Content-Type: application/json; charset=utf-8
Content-Length: 93
Connection: keep-alive

{
    "message": "id карточки не соответствует стандарту"
}
```

##### Значения тела ответа

| Параметры | Описание | Тип |
| ------------- | ------------- | ------------- |
| **message** | Детали ошибки | String |

#### Удаление лайка с карточки по несуществующему `_id`

`DELETE /cards/{card-id}/likes`

##### Параметры пути

| Параметры | Описание |
| ------------- | ------------- |
| **{card-id}** | Уникальный идентификатор документа карточки |

#### Пример запроса

`curl -b 'jwt=secret-key' -i -X DELETE -d "" http://localhost:3000/cards/5dd5109523f9622be84d75fa/likes`

##### Пример ответа

```
HTTP/1.1 404 Not Found
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 98
Date: Sat, 29 Feb 2020 16:24:20 GMT
X-RateLimit-Reset: 1584191585
X-DNS-Prefetch-Control: off
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Download-Options: noopen
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Content-Type: application/json; charset=utf-8
Content-Length: 93
Connection: keep-alive

{
  "message": "нет карточки с таким id"
}
```
##### Значения тела ответа

| Параметры | Описание | Тип |
| ------------- | ------------- | ------------- |
| **message** | Детали ошибки | String |


#### Удаление лайка с карточки по невалидному `_id`

`DELETE /cards/{card-id}/likes`

##### Параметры пути

| Параметры | Описание |
| ------------- | ------------- |
| **{card-id}** | Уникальный идентификатор документа карточки |

#### Пример запроса

`curl -b 'jwt=secret-key' -i -X DELETE -d "" http://localhost:3000/cards/123/likes`

##### Пример ответа

```
HTTP/1.1 400 Bad Request
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 98
Date: Sat, 29 Feb 2020 16:32:53 GMT
X-RateLimit-Reset: 1584191585
X-DNS-Prefetch-Control: off
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Download-Options: noopen
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Content-Type: application/json; charset=utf-8
Content-Length: 93
Connection: keep-alive

{
  "message": "id карточки не соответсвует стандарту"
}
```
##### Значения тела ответа

| Параметры | Описание | Тип |
| ------------- | ------------- | ------------- |
| **message** | Детали ошибки | String |
