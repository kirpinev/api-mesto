//  Класс для блока user-info
export default class UserInfo {
  constructor(DOM, api, owner) {
    this.name = DOM.querySelector('.user-info__name');
    this.about = DOM.querySelector('.user-info__job');
    this.avatar = DOM.querySelector('.user-info__photo');
    this.api = api;
    this.owner = owner;
  }

  getUserInfo(path) {
    this.api.get(path).then(user => {
      this.owner.id = user._id;

      this.name.textContent = user.name;
      this.about.textContent = user.about;
      this.avatar.style.backgroundImage = `url(${user.avatar})`;
    });
  }
}
