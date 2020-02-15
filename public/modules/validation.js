//  Класс для валидации
export default class Validation {
  constructor(errors) {
    this.errors = errors;
  }

  validate(event) {
    const [input1, input2] = event.currentTarget.elements;

    if (!input1.validity.valid || !input2.validity.valid) {
      this.checkEmptyInput(event, input1, input2);
      this.checkRange(event, input1, input2);
      this.checkCorrectInput(event, input1, input2);
      this.checkLink(event, input1, input2);
      this.disableButton(event);
    } else {
      this.removeErrors(event);
      this.activateButton(event);
    }
  }

  //  Проверка на пустое поле ввода
  checkEmptyInput(event, ...inputs) {
    if (event.target.value.length === 0) {
      inputs.forEach(input => {
        if (event.target.name === input.name) {
          document.querySelector(
            `#${input.name}`
          ).textContent = this.errors.emptyInput;
        }
      });
    }
  }

  //  Проверка диапазона поля ввода
  checkRange(event, ...inputs) {
    if (event.target.value.length === 1 || event.target.value.length > 30) {
      inputs.forEach(input => {
        if (event.target.name === input.name) {
          document.querySelector(
            `#${input.name}`
          ).textContent = this.errors.outOfRange;
        }
      });
    }
  }

  //  Проверка корректного значения в поле ввода
  checkCorrectInput(event, ...inputs) {
    if (event.target.validity.valid) {
      inputs.forEach(input => {
        if (event.target.name === input.name) {
          document.querySelector(
            `#${input.name}`
          ).textContent = this.errors.correctInput;
        }
      });
    }
  }

  //  Проверка ссылки
  checkLink(event, ...inputs) {
    if (!event.target.validity.valid && event.target.value.length === 0) {
      inputs.forEach(input => {
        if (event.target.name === input.name) {
          document.querySelector(
            `#${input.name}`
          ).textContent = this.errors.emptyInput;
        }
      });
    } else if (
      !event.target.validity.valid &&
      (event.target.name === 'link' || event.target.name === 'avatar')
    ) {
      inputs.forEach(input => {
        if (event.target.name === input.name) {
          document.querySelector(
            `#${input.name}`
          ).textContent = this.errors.invalidLink;
        }
      });
    }
  }

  //  Удаление ошибок
  removeErrors(event) {
    event.currentTarget.querySelectorAll('.error').forEach(error => {
      error.textContent = '';
    });
  }

  //  Отключение кнопки формы
  disableButton(event) {
    const button = event.currentTarget.querySelector('button');
    button.setAttribute('disabled', true);
    button.classList.add('button_disabled');
    button.classList.remove('button_active');
  }

  //  Включение кнопки формы
  activateButton(event) {
    const button = event.currentTarget.querySelector('button');
    button.removeAttribute('disabled');
    button.classList.remove('button_disabled');
    button.classList.add('button_active');
  }
}
