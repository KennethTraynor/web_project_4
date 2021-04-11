import {initialCards, defaultConfig} from "../utils/constants.js";

import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';

// Popups
const profilePopup = new PopupWithForm('.popup_type_profile', () => {

});
profilePopup.setEventListeners();

// const section = new Section(..);

const newCardPopup = new PopupWithForm('.popup_type_new-card', () => {
  // const card = new Card(..);
  // Selection.addItem(card.getView);
});
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

// Profile Open Button
const profileEditButton = document.querySelector('.profile__edit-button');
profileEditButton.addEventListener('click', profilePopup.open);

// Add Card Open Button
const addCardButton = document.querySelector('.profile__add-button');
addCardButton.addEventListener('click', newCardPopup.open);
