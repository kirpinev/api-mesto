export default class Spinner {
  constructor(container) {
    this.container = container;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this.container.classList.add('spinner_visible');
      this.container.classList.remove('spinner_hidden');
    } else {
      this.container.classList.remove('spinner_visible');
      this.container.classList.add('spinner_hidden');
    }
  }
}
