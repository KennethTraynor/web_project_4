// Profile Related Variables

// Profile Info
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');

// Profile Edit Button
let profileEditButton = document.querySelector('.profile__edit-button');

// Profile Modal
let profileModal = document.querySelector('.popup_type_profile');
let profileModalCloseButton = profileModal.querySelector('.popup__close-button');

// Edit Form
let profileModalFormElement = profileModal.querySelector('.edit-form__form');
let profileModalFormName = profileModal.querySelector('.edit-form__input_type_name');
let profleModalAbout = profileModal.querySelector('.edit-form__input_type_about');



// Card Related Variables

// New Card Button

let newCardAddButton = document.querySelector('.profile__add-button');

// New Card Modal
let newCardModal = document.querySelector('.popup_type_new-card');
let newCardModalCloseButton = newCardModal.querySelector('.popup__close-button');
let newCardModalFormElement = newCardModal.querySelector('.edit-form__form');
let newCardModalFormTitle = newCardModal.querySelector('.edit-form__input_type_title');
let newCardModalImageUrl = newCardModal.querySelector('.edit-form__input_type_image-url');

// Cards
let cardContainer = document.querySelector('.elements__container');
const cardTemplate = document.querySelector('#card-template').content;
const initialCards = [
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



// Toggle a modal window
function toggleModal(modalWindow) {
  modalWindow.classList.toggle('popup_opened');
}


// Open Profile Modal and Fill form values
function openProfileModal() {

  profileModalFormName.value = profileName.textContent;
  profleModalAbout.value = profileAbout.textContent;

  toggleModal(profileModal);

}

function handleProfileFormSubmit (evt) {
  evt.preventDefault();

  profileName.textContent = profileModalFormName.value;
  profileAbout.textContent = profleModalAbout.value;

  toggleModal(profileModal);

}


// Clone card, insert values and add functionality
function addCard(card) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const cardTitle = cardElement.querySelector('.element__text');
  const cardLikeButton = cardElement.querySelector('.element__like-button');
  const cardDeleteButton = cardElement.querySelector('.element__delete-button');


  cardImage.setAttribute('src', card.link);
  cardImage.setAttribute('alt', card.name);
  cardImage.addEventListener('click', () => {
    // temp
  });

  cardTitle.textContent = card.name;

  cardLikeButton.addEventListener('click', (evt) => evt.target.classList.toggle('element__like-button_active'));

  cardDeleteButton.addEventListener('click', () => cardElement.remove());

  cardContainer.append(cardElement);

}


// Generate new card from submit
function handleCardFormSubmit (evt) {
  evt.preventDefault();

  let card = {name: newCardModalFormTitle.value, link: newCardModalImageUrl.value};

  addCard(card);

  newCardModalFormTitle.value = '';
  newCardModalImageUrl.value = '';

  toggleModal(newCardModal);

}


initialCards.forEach(card => { addCard(card); })

// New Card Related
newCardAddButton.addEventListener('click', () => toggleModal(newCardModal));

newCardModalCloseButton.addEventListener('click', () => toggleModal(newCardModal));

newCardModalFormElement.addEventListener('submit', handleCardFormSubmit);

// Profile Edit Related

profileModalCloseButton.addEventListener('click', () => toggleModal(profileModal));

profileEditButton.addEventListener('click', openProfileModal);

profileModalFormElement.addEventListener('submit', handleProfileFormSubmit);
