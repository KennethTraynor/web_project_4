let formElement = document.querySelector('.edit-form__form');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let nameInput = document.querySelector('.edit-form__input_type_name');
let jobInput = document.querySelector('.edit-form__input_type_about');


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


document.querySelectorAll('.element__like-button').forEach(e => {
  e.addEventListener('click', evt => {
    evt.target.classList.toggle('element__like-button_active');
  })
});
