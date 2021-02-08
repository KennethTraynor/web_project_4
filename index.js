const formElement = document.querySelector('.edit-form__form');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.edit-form__close-button');
const popup = document.querySelector('.popup');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const nameInput = document.querySelector('.edit-form__input_type_name');
const jobInput = document.querySelector('.edit-form__input_type_about');


function toggleEdit() {
  popup.classList.toggle('popup_opened');
}


editButton.addEventListener('click', function(){

  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;

  toggleEdit();

});


closeButton.addEventListener('click', toggleEdit);


function handleFormSubmit (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;

  toggleEdit();

}


formElement.addEventListener('submit', handleFormSubmit);
