import Popup from './popup.js';

//  Класс PopupPlace расширяется классом Popup
export default class PopupPlace extends Popup {
  constructor(container, validation, cardList, api) {
    super(container);
    this.validation = validation;
    this.cardList = cardList;
    this.api = api;
  }

  open(event) {
    if (event.target.classList.contains('user-info__place-button')) {
      this.container.classList.add('popup_is-opened');

      this.disableButton();
      this.form.reset();
      this.removeErrors();
    }
  }

  close(event) {
    if (event.target.classList.contains('close__place')) {
      this.container.classList.remove('popup_is-opened');
    }
  }

  submit(path, event) {
    event.preventDefault();

    this.api.post(path, event).then(card => {
      this.cardList.addCard(
        card.name,
        card.link,
        card.likes,
        card.likes.length,
        card.owner._id,
        card._id
      );
    });

    this.container.classList.remove('popup_is-opened');
  }
}
