import {openModalWindow} from "./utils.js";


const previewModal = document.querySelector('.popup_type_preview');
const previewModalImage = previewModal.querySelector('.preview-image__image');
const previewModalCaption = previewModal.querySelector('.preview-image__caption');

const onImagePreview = card => {
  previewModalImage.src = card._link;
  previewModalImage.alt = card._name;
  previewModalCaption.textContent = card._name;
  openModalWindow(previewModal);
};

class Card {
  constructor(data, templateSelector) {
    this._link = data.link;
    this._name = data.name;
    this._templateSelector = templateSelector;
  }

  _getCardTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content.querySelector('.element');
    return cardTemplate;
  }

  _onLikeButtonClick(evt) {
    evt.target.classList.toggle('element__like-button_active');
  }

  _onRemoveButtonClick() {
    this._card.remove();
    this._card = null;
  }

  _setEventListeners() {
    const cardImage = this._card.querySelector('.element__image');
    const cardLikeButton = this._card.querySelector('.element__like-button');
    const cardDeleteButton = this._card.querySelector('.element__delete-button');
    cardLikeButton.addEventListener('click', (evt) => this._onLikeButtonClick(evt));
    cardDeleteButton.addEventListener('click', () => this._onRemoveButtonClick());
    cardImage.addEventListener('click', () => onImagePreview(this));
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
