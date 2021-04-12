export const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

export const defaultConfig = {
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
export const profileForm = profileModal.querySelector('.popup__form');
export const newCardForm = newCardModal.querySelector('.popup__form');
export const profileFormName = profileForm.querySelector('.popup__input_type_name');
export const profileFormAbout = profileForm.querySelector('.popup__input_type_about');

// Profile Values
export const profileName = document.querySelector('.profile__name').textContent;
export const profileAbout =  document.querySelector('.profile__about').textContent;
export const profileEditButton = document.querySelector('.profile__edit-button');

// Add Card Button
export const addCardButton = document.querySelector('.profile__add-button');
