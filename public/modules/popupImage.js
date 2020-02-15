//  Класс PopupImage
export default class PopupImage {
  constructor(container) {
    this.container = container;
  }

  open(event) {
    if (event.target.classList.contains('place-card__image')) {
      this.container.classList.add('popup_is-opened');
      this.container
        .querySelector('.image-popup')
        .setAttribute(
          `src`,
          `${event.target.style.backgroundImage.slice(5, -2)}`
        );
    }
  }

  close(event) {
    if (event.target.classList.contains('close__image')) {
      this.container.classList.remove('popup_is-opened');
    }
  }
}
