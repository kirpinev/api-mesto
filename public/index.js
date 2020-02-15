import Api from './modules/api.js';
import Card from './modules/card.js';
import CardList from './modules/cardList.js';
import { errors } from './modules/errors.js';
import Owner from './modules/owner.js';
import PopupAvatar from './modules/popupAvatar.js';
import PopupEdit from './modules/popupEdit.js';
import PopupImage from './modules/popupImage.js';
import Root from './modules/root.js';
import Spinner from './modules/spinner.js';
import UserInfo from './modules/userInfo.js';
import Validation from './modules/validation.js';
import PopupPlace from './modules/popupPlace.js';

// Апи
const api = new Api({
  url: 'http://95.216.175.5/cohort6',
  headers: {
    authorization: '037c14f8-74f5-4443-a201-4cab95df3460',
    'Content-Type': 'application/json'
  }
});

//  Спиннер для того чтобы показать загрузку картинок
const spinner = new Spinner(document.querySelector('.spinner'));

//  Объект для хранения id пользователя
const owner = new Owner();

// Блок user-info
const userInfoDom = document.querySelector('.user-info');

//  Имя, род деятельности, аватар пользователя
const userInfo = new UserInfo(userInfoDom, api, owner);

//  Экземпляр карточки
const card = new Card(api, owner);

//  Валидация для Ru страницы
const validation = new Validation(errors.ru);

// Создаем контейнер для карточек
const cardList = new CardList(
  document.querySelector('.places-list'),
  card,
  api,
  spinner
);

//  Попап Edit
const edit = new PopupEdit(
  document.querySelector('.popup_type_edit'),
  validation,
  userInfo,
  api
);

//  Попап Place
const place = new PopupPlace(
  document.querySelector('.popup_type_place'),
  validation,
  cardList,
  api
);

const avatar = new PopupAvatar(
  document.querySelector('.popup_type_avatar'),
  validation,
  userInfo,
  api
);

//  Попап Image
const image = new PopupImage(document.querySelector('.popup_type_image'));

//  Получает данные с сервера
userInfo.getUserInfo('/users/me');

//  Добавляем карточки в контейнер
cardList.render('/cards');

//  Открытие попапа edit/place
userInfoDom.addEventListener('click', event => {
  avatar.open(event);
  edit.open(event);
  place.open(event);
});

//  Лайк/удаление карточки
cardList.container.addEventListener('click', event => {
  card.like(event);
  card.remove(event);
});

//  Валидация формы avatar и обновление аватарки
avatar.form.addEventListener('input', event => {
  avatar.validation.validate(event);
});
avatar.form.addEventListener('submit', event => {
  avatar.submit('/users/me/avatar', event);
});

//  Валидация и обновление формы edit
edit.form.addEventListener('input', event => {
  edit.validation.validate(event);
});
edit.form.addEventListener('submit', event => {
  edit.submit('/users/me', event);
});

//  Валидация формы place и добавление новой карточки
place.form.addEventListener('input', event => {
  place.validation.validate(event);
});
place.form.addEventListener('submit', event => {
  place.submit('/cards', event);
});

//  Рут контейнер
const root = new Root(document.querySelector('.root'));
//  Открытие/закрытие картинки/формы edit/формы place
root.container.addEventListener('click', event => {
  image.open(event);
  image.close(event);
  avatar.close(event);
  place.close(event);
  edit.close(event);
});
