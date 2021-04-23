import './index.css';
import { defaultConfig } from "../utils/constants.js";
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

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

// Profile Values
const profileName = document.querySelector('.profile__name').textContent;
const profileAbout = document.querySelector('.profile__about').textContent;
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
  currentCardElement.remove();
  api.deleteCard({ cardID: currentCardID });
  confirmPopup.close();
});

confirmPopup.setEventListeners();


// API
export const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-10",
  headers: {
    authorization: "60ad2ada-16d8-4dd8-b337-f86301ff39f8",
    "Content-Type": "application/json"
  }
});



// User Info
const userInfo = new UserInfo();

api.getUserInfo()
  .then(res => {
    userInfo.setProfileInfo(res);
    userInfo.setUserID(res);
    userInfo.setAvatar(res.avatar);
  })
  .then(() => {

    // Cards

    // Card Click Handlers
    const handleCardClick = (name, link) => imagePopup.open(name, link);

    const handleDeleteClick = ({ cardID, cardElement }) => {
      currentCardID = cardID;
      currentCardElement = cardElement;
      confirmPopup.open();
    };

    const handleLikeClick = ({ cardID, card }) => {
      const isLiked = card.getLiked({ userID: userInfo.getUserID() });
      card.updateLikeID({ userID: userInfo.getUserID(), like: !isLiked });
      api.updateCardLike({ cardID, like: !isLiked });
    };

    // Initial Cards
    api.getInitialCards()
      .then((res) => {
        const section = new Section(
          {
            items: res,
            renderer: (item) => {
              const card = new Card(
                {
                  data: item,
                  handleCardClick: handleCardClick,
                  handleDeleteClick: handleDeleteClick,
                  handleLikeClick: handleLikeClick
                },
                '#card-template');

              section.addItem(card.generateCard());

              card.initializeLikedState({ userID: userInfo.getUserID() });

            }
          },
          '.elements__container');

        section.renderer();

        // New Card
        const newCardPopup = new PopupWithForm('.popup_type_new-card', (values) => {
          newCardFormValidator.renderSaving(true);
          api.addCard({ name: values.title, link: values.url })
            .then(res => {
              const card = new Card(
                {
                  data: res,
                  handleCardClick: handleCardClick,
                  handleDeleteClick: handleDeleteClick,
                  handleLikeClick: handleLikeClick
                },
                '#card-template');

              section.addItem(card.generateCard());

            })
            .finally(() => {
              newCardFormValidator.renderSaving(false);
              newCardPopup.close();
            })
        });

        newCardPopup.setEventListeners();


        // Add Card Open Button
        addCardButton.addEventListener('click', () => {
          newCardFormValidator.recheckValiditiy();
          newCardPopup.open();
        });

      });
  });



// Profile
const profilePopup = new PopupWithForm('.popup_type_profile', (values) => {
  profileFormValidator.renderSaving(true);
  api.setUserInfo({ name: values.name, about: values.about })
    .then(res => userInfo.setProfileInfo({ name: res.name, about: res.about }))
    .finally(() => {
      profileFormValidator.renderSaving(false);
      profilePopup.close();
    })
});

profilePopup.setEventListeners();



// Image
const imagePopup = new PopupWithImage('.popup_type_preview');
imagePopup.setEventListeners();



// Avatar
const avatarPopup = new PopupWithForm('.popup_type_avatar', (values) => {
  avatarFormValidator.renderSaving(true);
  api.setUserAvatar({ avatar: values.url })
    .then(res => userInfo.setAvatar(res.avatar))
    .finally(() => {
      avatarFormValidator.renderSaving(false);
      avatarPopup.close();
    })
});

avatarPopup.setEventListeners();



// Profile Open Button
profileEditButton.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  profileFormName.value = info.name;
  profileFormAbout.value = info.about;
  profileFormValidator.recheckValiditiy();
  profilePopup.open();
});



// Avatar edit Open Button
avatarEditButton.addEventListener('click', () => {
  avatarFormValidator.recheckValiditiy();
  avatarPopup.open();
});

