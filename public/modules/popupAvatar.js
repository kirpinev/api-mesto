import Popup from './popup.js';

export default class PopupAvatar extends Popup {
  constructor(container, validation, user, api) {
    super(container);
    this.validation = validation;
    this.user = user;
    this.api = api;
  }

  open(event) {
    if (event.target.classList.contains('user-info__photo')) {
      this.container.classList.add('popup_is-opened');

      this.disableButton();
      this.form.reset();
      this.removeErrors();
    }
  }

  close(event) {
    if (event.target.classList.contains('close__avatar')) {
      this.container.classList.remove('popup_is-opened');
    }
  }

  submit(path, event) {
    event.preventDefault();

    this.api.updateAvatar(path, event).then(userInfo => {
      this.user.avatar.style.backgroundImage = `url(${userInfo.avatar})`;
    });

    this.container.classList.remove('popup_is-opened');
  }
}
