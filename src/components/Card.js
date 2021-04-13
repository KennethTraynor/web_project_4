class Card {
  constructor({data, handleCardClick}, templateSelector) {
    this._link = data.link;
    this._name = data.name;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getCardTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content.querySelector('.element');
    return cardTemplate;
  }

  _handleLikeButton() {
    this._card.querySelector('.element__like-button')
      .classList.toggle('element__like-button_active');
  }

  _handleDeleteCard() {
    this._card.remove();
    this._card = null;
  }

  _setEventListeners() {
    this._card.querySelector('.element__image')
      .addEventListener('click', () => this._handleCardClick(this._name, this._link));

    this._card.querySelector('.element__like-button')
      .addEventListener('click', () => this._handleLikeButton());

    this._card.querySelector('.element__delete-button')
      .addEventListener('click', () => this._handleDeleteCard());

  }

  generateCard() {
    this._card = this._getCardTemplate().cloneNode(true);
    const cardImage = this._card.querySelector('.element__image');
    const cardTitle = this._card.querySelector('.element__text');

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._card;
  }
}

export default Card;
