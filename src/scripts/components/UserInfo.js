class UserInfo {
  constructor({name, job}){
    this._name = name;
    this._job = job;
  }

  getUserInfo() {
    return {name: this._name, job: this._job};
  }

  setUserInfo() {
    document.querySelector('.profile__name').textContent = this._name;
    document.querySelector('.profile__about').textContent = this._job;
  }

}
