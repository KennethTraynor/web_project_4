import { loadImage } from "../utils/utils.js";

class Card {
  constructor({ data, handleCardClick, handleDeleteClick, handleLikeClick }, templateSelector) {
    this._link = data.link;
    this._name = data.name;
    this._id = data._id;
    this._likes = data.likes.map(({ _id }) => _id);
    this._owner = data.owner;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getCardTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content.querySelector('.element');
    return cardTemplate;
  }

  getLiked({ userID }) {
    return this._likes.some((likeID) => likeID == userID);
  }

  updateLiked({ userID, likes }) {

    this._likes = likes.map(({ _id }) => _id);

    const like = this.getLiked({ userID });

    if (like) {
      this._card.querySelector('.element__like-button').classList.add('element__like-button_active');
    } else {
      this._card.querySelector('.element__like-button').classList.remove('element__like-button_active');
    }

    this._card.querySelector('.element__like-count').textContent = (this._likes.length).toString();
  }

  _setEventListeners({ userID }) {
    this._card.querySelector('.element__image')
      .addEventListener('click', () => this._handleCardClick(this._name, this._link));

    this._card.querySelector('.element__like-button')
      .addEventListener('click', () => this._handleLikeClick({ cardID: this._id, card: this }));

    if (this._owner._id == userID) {
      this._card.querySelector('.element__delete-button')
        .addEventListener('click', () => this._handleDeleteClick({ cardID: this._id, cardElement: this._card }));
    }
  }

  generateCard({ userID }) {
    this._card = this._getCardTemplate().cloneNode(true);
    const cardImage = this._card.querySelector('.element__image');
    const cardTitle = this._card.querySelector('.element__text');

    loadImage(this._link)
      .then(img => {
        cardImage.src = img.src;
        cardImage.alt = this._name;
      })
      .catch(err => {
        console.log(err);
        cardImage.alt = err;
      });

    cardTitle.textContent = this._name;

    if (this._owner._id !== userID) {
      this._card.querySelector('.element__delete-button').remove();
    }

    this._setEventListeners({ userID });

    return this._card;
  }
}

export default Card;
