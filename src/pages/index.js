import './index.css';
import { defaultConfig } from "../utils/constants.js";
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import { loadImage } from "../utils/utils.js";

// Modals
const profileModal = document.querySelector('.popup_type_profile');
const newCardModal = document.querySelector('.popup_type_new-card');
const avatarModal = document.querySelector('.popup_type_avatar');
const confirmModal = document.querySelector('.popup_type_confirm');

// Forms
const profileForm = profileModal.querySelector('.popup__form');
const newCardForm = newCardModal.querySelector('.popup__form');
const avatarForm = avatarModal.querySelector('.popup__form');
const confirmForm = confirmModal.querySelector('.popup__form');

// Profile Form Values
const profileFormName = profileForm.querySelector('.popup__input_type_name');
const profileFormAbout = profileForm.querySelector('.popup__input_type_about');

// Profile Button
const profileEditButton = document.querySelector('.profile__edit-button');

// Add Card Button
const addCardButton = document.querySelector('.profile__add-button');

// Avatar
const avatarEditButton = document.querySelector('.profile__avatar-edit-button');

// Validators
const profileFormValidator = new FormValidator(defaultConfig, profileForm);
const newCardFormValidator = new FormValidator(defaultConfig, newCardForm);
const avatarFormValidator = new FormValidator(defaultConfig, avatarForm);
const confirmFormValidator = new FormValidator(defaultConfig, confirmForm);

profileFormValidator.enableValidation();
newCardFormValidator.enableValidation();
avatarFormValidator.enableValidation();
confirmFormValidator.enableValidation();



let currentCardID;
let currentCardElement;

// Confirm Popup
const confirmPopup = new PopupWithForm('.popup_type_confirm', () => {
  api.deleteCard({ cardID: currentCardID })
    .then(() => {
      currentCardElement.remove();
      confirmPopup.close();
    })
    .catch((err) => console.log(err));
});

confirmPopup.setEventListeners();


// API
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-10",
  headers:
  {
    authorization: "60ad2ada-16d8-4dd8-b337-f86301ff39f8",
    "Content-Type": "application/json"
  }
});

// User Info
const userInfo = new UserInfo();

api.getUserInfo()
  .then((res) => {
    userInfo.setProfileInfo(res);
    userInfo.setUserID(res);
    userInfo.setAvatar(res.avatar);
  })
  .then(() => api.getInitialCards())
  .then((res) => {

    // New Card Function
    function createNewCard(data) {
      return new Card(
        {
          data: data,
          handleCardClick: (name, link) => imagePopup.open(name, link),
          handleDeleteClick: ({ cardID, cardElement }) => {
            currentCardID = cardID;
            currentCardElement = cardElement;
            confirmPopup.open();
          },
          handleLikeClick: ({ cardID, card }) => {
            const isLiked = card.getLiked({ userID: userInfo.getUserID() });
            api.updateCardLike({ cardID, like: !isLiked })
              .then((res) => {
                card.updateLiked({ userID: userInfo.getUserID(), likes: res.likes });
              })
              .catch(err => console.log(err));
          }
        },
        '#card-template');
    }

    // Create Section and Get Existing Cards
    const section = new Section(
      {
        items: res,
        renderer: (item) => {
          const card = createNewCard(item);
          section.addItem(card.generateCard({ userID: userInfo.getUserID() }));
          card.updateLiked({ userID: userInfo.getUserID(), likes: item.likes });
        }
      },
      '.elements__container');

    section.renderer();


    // New Card
    const newCardPopup = new PopupWithForm('.popup_type_new-card', (values) => {

      newCardFormValidator.renderSaving(true);

      loadImage(values.url)
        .then(() => api.addCard({ name: values.title, link: values.url }))
        .then(res => {
          const card = createNewCard(res);
          section.addItem(card.generateCard({ userID: userInfo.getUserID() }));
          newCardPopup.close();
        })
        .catch(err => console.log(err))
        .finally(() => {
          newCardFormValidator.renderSaving(false);
        })
    });

    newCardPopup.setEventListeners();

    // Add Card Open Button
    addCardButton.addEventListener('click', () => {
      newCardFormValidator.recheckValiditiy();
      newCardPopup.open();
    });

  })
  .catch((err) => console.log(err));



// Profile
const profilePopup = new PopupWithForm('.popup_type_profile', (values) => {
  profileFormValidator.renderSaving(true);
  api.setUserInfo({ name: values.name, about: values.about })
    .then(res => {
      userInfo.setProfileInfo({ name: res.name, about: res.about })
      profilePopup.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      profileFormValidator.renderSaving(false);
    })
});

profilePopup.setEventListeners();

// Profile Open Button
profileEditButton.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  profileFormName.value = info.name;
  profileFormAbout.value = info.about;
  profileFormValidator.recheckValiditiy();
  profilePopup.open();
});



// Avatar
const avatarPopup = new PopupWithForm('.popup_type_avatar', (values) => {
  avatarFormValidator.renderSaving(true);
  loadImage(values.url)
    .then(() => api.setUserAvatar({ avatar: values.url }))
    .then(res => {
      userInfo.setAvatar(res.avatar);
      avatarPopup.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      avatarFormValidator.renderSaving(false);
    })
});

avatarPopup.setEventListeners();

// Avatar edit Open Button
avatarEditButton.addEventListener('click', () => {
  avatarFormValidator.recheckValiditiy();
  avatarPopup.open();
});



// Image
const imagePopup = new PopupWithImage('.popup_type_preview');

imagePopup.setEventListeners();
