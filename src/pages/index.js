import './index.css';
import {initialCards, defaultConfig} from "../utils/constants.js";
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';


// Modals
const profileModal = document.querySelector('.popup_type_profile');
const newCardModal = document.querySelector('.popup_type_new-card');

// Forms
const profileForm = profileModal.querySelector('.popup__form');
const newCardForm = newCardModal.querySelector('.popup__form');
const profileFormName = profileForm.querySelector('.popup__input_type_name');
const profileFormAbout = profileForm.querySelector('.popup__input_type_about');

// Profile Values
const profileName = document.querySelector('.profile__name').textContent;
const profileAbout =  document.querySelector('.profile__about').textContent;
const profileEditButton = document.querySelector('.profile__edit-button');

// Add Card Button
const addCardButton = document.querySelector('.profile__add-button');


// Validators
const profileFormValidator = new FormValidator(defaultConfig, profileForm);
const newCardFormValidator = new FormValidator(defaultConfig, newCardForm);

profileFormValidator.enableValidation();
newCardFormValidator.enableValidation();


// UserInfo

const userInfo = new UserInfo({ name: profileName, job: profileAbout });


// Profile
const profilePopup = new PopupWithForm('.popup_type_profile', (values) => {
  userInfo.setUserInfo({ name: values.name, job: values.about });
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
const newCardPopup = new PopupWithForm('.popup_type_new-card', (values) => {
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
