//  Класс карточки
export default class Card {
  constructor(api, owner) {
    this.api = api;
    this.owner = owner;
  }

  create(name, link, usersLiked, likes = 0, loadedOwnerId, cardId) {
    const displayDeleteButton =
      this.owner.id === loadedOwnerId ? 'block' : 'none';

    const isLiked = usersLiked.some(like => this.owner.id === like._id);

    const displayLikeIcon =
      isLiked === true ? 'place-card__like-icon_liked' : '';

    return `
		<div class="place-card" id="${cardId}">
			<div class="place-card__image" style="background-image: url(${link});">
				<button class="place-card__delete-icon" style="display: ${displayDeleteButton};"></button>
			</div>
			<div class="place-card__description">
				<h3 class="place-card__name">${name}</h3>
				<div class="place-card__container">
				    <button class="place-card__like-icon ${displayLikeIcon}"></button>
				    <p class="place-card__likes-number">${likes}</p>
                </div>
			</div>
		</div>
		`;
  }

  like(event) {
    if (event.target.classList.contains('place-card__like-icon')) {
      const card = event.target.closest('.place-card');
      const cardLikes = card.querySelector('.place-card__likes-number');

      if (event.target.classList.contains('place-card__like-icon_liked')) {
        this.api.delete('/cards/like', card.id).then(card => {
          cardLikes.textContent = card.likes.length;
        });
      } else {
        this.api.put('/cards/like', card.id).then(card => {
          cardLikes.textContent = card.likes.length;
        });
      }

      event.target.classList.toggle('place-card__like-icon_liked');
    }
  }

  remove(event) {
    if (event.target.classList.contains('place-card__delete-icon')) {
      if (confirm('Вы действительно хотите удалить эту картинку?')) {
        this.api.delete('/cards', event.target.closest('.place-card').id);

        event.target.closest('.place-card').remove();
      }
    }
  }
}
