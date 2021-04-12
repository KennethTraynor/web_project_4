import "./styles/index.css";
import {
initialCards,
defaultConfig,
profileForm,
newCardForm,
profileFormName,
profileFormAbout,
profileName,
profileAbout,
profileEditButton,
addCardButton
} from "./scripts/utils/constants.js";
import Section from './scripts/components/Section.js';
import Card from './scripts/components/Card.js';
import FormValidator from './scripts/components/FormValidator.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';
import PopupWithImage from './scripts/components/PopupWithImage.js';
import UserInfo from './scripts/components/UserInfo.js';

// Validators
const profileFormValidator = new FormValidator(defaultConfig, profileForm);
const newCardFormValidator = new FormValidator(defaultConfig, newCardForm);

profileFormValidator.enableValidation();
newCardFormValidator.enableValidation();


// UserInfo

const userInfo = new UserInfo({ name: profileName, job: profileAbout });


// Profile
const profilePopup = new PopupWithForm('.popup_type_profile', (e) => {
  e.preventDefault();
  userInfo.setUserInfo({ name: profileFormName.value, job: profileFormAbout.value });
  profilePopup.close();
});

profilePopup.setEventListeners();



// Image
const imagePopup = new PopupWithImage('.popup_type_preview');
imagePopup.setEventListeners();



// Section
const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card({ data: item, handleCardClick: (name, link) => imagePopup.open(name, link) }, '#card-template');
      section.addItem(card.generateCard());
    }
  },
  '.elements__container');

section.renderer();



// New Card
const newCardPopup = new PopupWithForm('.popup_type_new-card', (e) => {
  e.preventDefault();
  const values = newCardPopup._getInputValues();
  const card = new Card({ data: { name: values.title, link: values.url }, handleCardClick: (name, link) => imagePopup.open(name, link) }, '#card-template');
  section.addItem(card.generateCard());
  newCardPopup.close();
});

newCardPopup.setEventListeners();



// Profile Open Button
profileEditButton.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  profileFormName.value = info.name;
  profileFormAbout.value = info.job;
  profileFormValidator.recheckValiditiy();
  profilePopup.open();
});



// Add Card Open Button
addCardButton.addEventListener('click', () => {
  newCardFormValidator.recheckValiditiy();
  newCardPopup.open();
});
