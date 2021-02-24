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
const profileModalFormElement = profileModal.querySelector('.edit-form__form');
const profileModalFormName = profileModal.querySelector('.edit-form__input_type_name');
const profleModalAbout = profileModal.querySelector('.edit-form__input_type_about');



// Card

// Cards
const cardContainer = document.querySelector('.elements__container');
const cardTemplate = document.querySelector('#card-template').content;

// Button
const newCardAddButton = document.querySelector('.profile__add-button');

// Modal
const newCardModal = document.querySelector('.popup_type_new-card');
const newCardModalCloseButton = newCardModal.querySelector('.popup__close-button');
const newCardModalFormElement = newCardModal.querySelector('.edit-form__form');
const newCardModalFormTitle = newCardModal.querySelector('.edit-form__input_type_title');
const newCardModalImageUrl = newCardModal.querySelector('.edit-form__input_type_image-url');



// Image Preview

// Modal
const previewModal = document.querySelector('.popup_type_preview');
const previewModalCloseButton = previewModal.querySelector('.popup__close-button');
const previewModalImage = previewModal.querySelector('.preview-image__image');
const previewModalCaption = previewModal.querySelector('.preview-image__caption');



// Functions

// Toggle a modal window
function toggleModal(modalWindow) {
  modalWindow.classList.toggle('popup_opened');
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

