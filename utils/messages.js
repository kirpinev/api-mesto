const messages = {
  registration: {
    allFields: {
      isRequired:
        'Необходимо передать все поля (email, password, name, about, avatar)'
    },
    password: {
      tooShort: 'Длина пароля должна быть минимум 8 символов'
    },
    email: {
      shouldBeUnique: 'Почта должна быть уникальной'
    }
  },
  authorization: {
    isRequired: 'Нужна авторизация',
    isSuccessful: 'Вход успешно выполнен',
    isFailed: 'Неправильные почта или пароль',
    allFields: {
      isRequired: 'Необходимо передать оба поля email и password'
    }
  },
  user: {
    id: {
      isNotFound: 'Нет пользователя с такими id',
      isNotValid: 'Id пользователя не соответствует стандарту'
    }
  },
  card: {
    isDeleted: 'Карточка успешно удалена',
    id: {
      isNotFound: 'Нет карточки с таким id',
      isNotValid: 'Id карточки не соответствует стандарту'
    }
  },
  root: {
    isNotFound: 'Запрашиваемый ресурс не найден'
  }
};

module.exports = {
  messages
};
