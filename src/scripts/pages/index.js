import {initialCards, defaultConfig} from "../utils/constants.js";

import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';

import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';

const profilePopup = new PopupWithForm('.popup_type_profile');
profilePopup.setEventListeners();

const newCardPopup = new PopupWithForm('.popup_type_new-card');
newCardPopup.setEventListeners();

const imagePopup = new PopupWithImage('.popup_type_preview');
imagePopup.setEventListeners();

// Modals
const profileModal = document.querySelector('.popup_type_profile');
const newCardModal = document.querySelector('.popup_type_new-card');

// Forms
const profileForm = profileModal.querySelector('.popup__form');
const newCardForm = newCardModal.querySelector('.popup__form');

// Validators
const profileFormValidator = new FormValidator(defaultConfig, profileForm);
const newCardFormValidator = new FormValidator(defaultConfig, newCardForm);

profileFormValidator.enableValidation();
newCardFormValidator.enableValidation();


const profileEditButton = document.querySelector('.profile__edit-button');
profileEditButton.addEventListener('click', profilePopup.open);

const addCardButton = document.querySelector('.profile__add-button');
addCardButton.addEventListener('click', newCardPopup.open);

// Card Variables
const cardWrapper = document.querySelector('.elements__container');

// Functions

const appendCard = (data, wrapper) => {
  const card = new Card(
    {
      data: data,
      handleCardClick: (name, link) => imagePopup.open(name, link)
    },
    '#card-template'
  );
  wrapper.prepend(card.generateCard());
}


initialCards.forEach((data) => {
  appendCard(data, cardWrapper);
});
