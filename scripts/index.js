// Profile

// Info
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

// Button
const profileEditButton = document.querySelector('.profile__edit-button');

// Modal
const profileModal = document.querySelector('.popup_type_profile');
const profileModalCloseButton = profileModal.querySelector('.popup__close-button');

// Form
const profileModalFormElement = profileModal.querySelector('.popup__form');
const profileModalFormName = profileModalFormElement.querySelector('.popup__input_type_name');
const profleModalAbout = profileModalFormElement.querySelector('.popup__input_type_about');



// Card

// Cards
const cardContainer = document.querySelector('.elements__container');
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

// Button
const newCardAddButton = document.querySelector('.profile__add-button');

// Modal
const newCardModal = document.querySelector('.popup_type_new-card');
const newCardModalCloseButton = newCardModal.querySelector('.popup__close-button');
const newCardModalFormElement = newCardModal.querySelector('.popup__form');
const newCardModalFormTitle = newCardModal.querySelector('.popup__input_type_title');
const newCardModalImageUrl = newCardModal.querySelector('.popup__input_type_image-url');



// Image Preview

// Modal
const previewModal = document.querySelector('.popup_type_preview');
const previewModalCloseButton = previewModal.querySelector('.popup__close-button');
const previewModalImage = previewModal.querySelector('.preview-image__image');
const previewModalCaption = previewModal.querySelector('.preview-image__caption');

// Functions

// Toggles clicked modal
const handleBackgroundClose = (evt) => {
  if (evt.target.classList.contains('popup')){
    toggleModal(evt.target);
  }
}

// Toggles opened modal
const handleModalKeyDown = (evt) => {
  if(evt.key === "Escape"){
    toggleModal(document.querySelector('.popup_opened'));
  }
}

// Toggle a modal window
const toggleModal = (modalWindow) => {

  if (!modalWindow.classList.contains('popup_opened')) {

    // Add opened class, remove closed class
    modalWindow.classList.add('popup_opened');
    modalWindow.classList.remove('popup_closed');

    // Reevaluate forms if it has any
    if(modalWindow.querySelector('popup__form') !== undefined){
      const forms = modalWindow.querySelectorAll('popup__form');
      forms.forEach((form) => reevaluateValidity(form));
    }

    // Add event listeners for closing
    modalWindow.addEventListener('click', handleBackgroundClose);
    document.addEventListener('keydown', handleModalKeyDown);
  } else {

    // Add closed class, remove opened class
    modalWindow.classList.add('popup_closed');
    modalWindow.classList.remove('popup_opened');

    // Remove event listeners for closing
    modalWindow.removeEventListener('click', handleBackgroundClose);
    document.removeEventListener('keydown', handleModalKeyDown);
  }


}

// Open Profile Modal and Fill values
function openProfileModal() {

  profileModalFormName.value = profileName.textContent;
  profleModalAbout.value = profileAbout.textContent;

  toggleModal(profileModal);

}

// Profile Submit Handler
function handleProfileFormSubmit (evt) {
  evt.preventDefault();

  profileName.textContent = profileModalFormName.value;
  profileAbout.textContent = profleModalAbout.value;

  toggleModal(profileModal);

}

// Open Card Modal and Reset values
function openCardModal() {

  newCardModalFormTitle.value = '';
  newCardModalImageUrl.value = '';

  toggleModal(newCardModal);

}

// Generate new card element
function generateCardElement(card) {

  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const cardTitle = cardElement.querySelector('.element__text');
  const cardLikeButton = cardElement.querySelector('.element__like-button');
  const cardDeleteButton = cardElement.querySelector('.element__delete-button');


  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardImage.addEventListener('click', () => onImagePreview(card));

  cardTitle.textContent = card.name;

  cardLikeButton.addEventListener('click', (evt) => onLikeButtonClick(evt));

  cardDeleteButton.addEventListener('click', () => onRemoveButtonClick(cardElement));

  return cardElement;

}

// Append Card
function appendCard(card, wrapper){
  wrapper.append(generateCardElement(card));
}

// Generate new card from submit
function handleCardCreate (evt) {
  evt.preventDefault();

  const card = {name: newCardModalFormTitle.value, link: newCardModalImageUrl.value};

  appendCard(card, cardContainer);

  toggleModal(newCardModal);

}

// Card Remove Button
const onRemoveButtonClick = cardElement => { cardElement.remove();};

// Card Like Button
const onLikeButtonClick = evt => evt.target.classList.toggle('element__like-button_active');

// Card Preview Open
const onImagePreview = card => {
  previewModalImage.src = card.link;
  previewModalImage.alt = card.name;
  previewModalCaption.textContent = card.name;

  toggleModal(previewModal);
};



// Events


// Card Related
newCardAddButton.addEventListener('click', () => openCardModal());

newCardModalCloseButton.addEventListener('click', () => toggleModal(newCardModal));

newCardModalFormElement.addEventListener('submit', handleCardCreate);


// Initilize Cards
initialCards.forEach(card => appendCard(card, cardContainer));


// Profile Edit Related
profileModalCloseButton.addEventListener('click', () => toggleModal(profileModal));

profileEditButton.addEventListener('click', openProfileModal);

profileModalFormElement.addEventListener('submit', handleProfileFormSubmit);


// Preview Image Related
previewModalCloseButton.addEventListener('click', () => toggleModal(previewModal));

