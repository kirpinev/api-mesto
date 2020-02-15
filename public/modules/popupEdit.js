import Popup from './popup.js';

//  Класс PopupEdit расширяется классом Popup
export default class PopupEdit extends Popup {
  constructor(container, validation, user, api) {
    super(container);
    this.validation = validation;
    this.api = api;
    this.user = user;
  }

  open(event) {
    if (event.target.classList.contains('user-info__edit-button')) {
      this.container.classList.add('popup_is-opened');

      const [name, job] = this.form.elements;

      name.value = this.user.name.textContent;
      job.value = this.user.about.textContent;

      this.activateButton();
      this.removeErrors();
    }
  }

  close(event) {
    if (event.target.classList.contains('close__edit')) {
      this.container.classList.remove('popup_is-opened');
    }
  }

  submit(path, event) {
    event.preventDefault();

    this.api.updateInfo(path, event).then(received => {
      this.user.name.textContent = received.name;
      this.user.about.textContent = received.about;
    });

    this.container.classList.remove('popup_is-opened');
  }
}
