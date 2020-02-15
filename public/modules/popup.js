// Класс Popup
export default class Popup {
  constructor(container) {
    this.container = container;
    this.button = this.container.querySelector('button');
    this.form = this.container.querySelector('form');
  }

  disableButton() {
    this.button.setAttribute('disabled', true);
    this.button.classList.add('button_disabled');
    this.button.classList.remove('button_active');
  }

  activateButton() {
    this.button.removeAttribute('disabled');
    this.button.classList.remove('button_disabled');
    this.button.classList.add('button_active');
  }

  removeErrors() {
    this.form.querySelectorAll('.error').forEach(error => {
      error.textContent = '';
    });
  }
}
