class UserInfo {
  constructor() {}

  getUserInfo() {
    return {name: this._name, about: this._about, id: this._id};
  }

  setUserID({_id}) {
    this._id = _id;
  }

  getUserID() {
    return this._id;
  }

  setAvatar(avatar) {
    document.querySelector('.profile__avatar').src = avatar;
    this._avatar = avatar;
  }

  setProfileInfo({name, about}) {
    this._name = name;
    this._about = about;
    document.querySelector('.profile__name').textContent = this._name;
    document.querySelector('.profile__about').textContent = this._about;
  }

}

export default UserInfo;
