import {openModalWindow, closeModalWindow} from "./utils.js";
import {initialCards} from "./data.js";

import FormValidator from './FormValidator.js';
import Card from './Card.js';

const defaultConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

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

// Profile Variables
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileFormName = profileModal.querySelector('.popup__input_type_name');
const profileFormAbout = profileModal.querySelector('.popup__input_type_about');

// Card Variables
const cardWrapper = document.querySelector('.elements__container');

const newCardAddButton = document.querySelector('.profile__add-button');
const newCardFormTitle = newCardModal.querySelector('.popup__input_type_title');
const newCardFormUrl = newCardModal.querySelector('.popup__input_type_image-url');
const cardTemplateSelector = '#card-template';

// Popups
const popups = Array.from(document.querySelectorAll('.popup'));

// Functions

const openProfileModal = () => {
  profileFormName.value = profileName.textContent;
  profileFormAbout.value = profileAbout.textContent;
  profileFormValidator.recheckValiditiy();
  openModalWindow(profileModal);
}

const openCardModal = () => {
  newCardFormTitle.value = '';
  newCardFormUrl.value = '';
  newCardFormValidator.recheckValiditiy()
  openModalWindow(newCardModal);
}

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = profileFormName.value;
  profileAbout.textContent = profileFormAbout.value;
  closeModalWindow(profileModal);
}

const appendCard = (data, wrapper) => {
  const card = new Card(data, cardTemplateSelector);
  wrapper.prepend(card.generateCard());
}

const handleCardCreate = (evt) => {
  evt.preventDefault();
  const data = {name: newCardFormTitle.value, link: newCardFormUrl.value};
  appendCard(data, cardWrapper);
  closeModalWindow(newCardModal);
}

// Events

newCardAddButton.addEventListener('click', () => openCardModal());
newCardForm.addEventListener('submit', handleCardCreate);

profileEditButton.addEventListener('click', openProfileModal);
profileForm.addEventListener('submit', handleProfileFormSubmit);

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closeModalWindow(popup);
    }
    if (evt.target.classList.contains('popup__close-button')) {
      closeModalWindow(popup);
    }
  })
})



initialCards.forEach(data => appendCard(data, cardWrapper));
