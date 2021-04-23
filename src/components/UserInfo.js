import { loadImage } from "../utils/utils.js";

class UserInfo {
  constructor() { }

  getUserInfo() {
    return { name: this._name, about: this._about, id: this._id };
  }

  setUserID({ _id }) {
    this._id = _id;
  }

  getUserID() {
    return this._id;
  }

  setAvatar(avatar) {
    loadImage(avatar)
      .then(img => {
        document.querySelector('.profile__avatar').src = img.src;
        this._avatar = avatar;
      })
      .catch(err => console.log(err))
  }

  setProfileInfo({ name, about }) {
    this._name = name;
    this._about = about;
    document.querySelector('.profile__name').textContent = this._name;
    document.querySelector('.profile__about').textContent = this._about;
  }

}

export default UserInfo;
