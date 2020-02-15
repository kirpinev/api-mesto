//Класс для контейнера с карточками
export default class CardList {
  constructor(container, cardTemplate, api, spinner) {
    this.container = container;
    this.cardTemplate = cardTemplate;
    this.api = api;
    this.spinner = spinner;
  }

  addCard(name, link, usersLiked, likes, loadedOwnerId, cardId) {
    const card = this.cardTemplate.create(
      name,
      link,
      usersLiked,
      likes,
      loadedOwnerId,
      cardId
    );
    this.container.insertAdjacentHTML('beforeend', card);
  }

  render(path) {
    this.spinner.renderLoading(true);

    this.api
      .get(path)
      .then(cards => {
        cards.forEach(card => {
          this.addCard(
            card.name,
            card.link,
            card.likes,
            card.likes.length,
            card.owner._id,
            card._id
          );
        });
      })
      .finally(() => {
        this.spinner.renderLoading(false);
      });
  }
}
