// Shows error message
function showErrorMessage(input, form, {errorClass, inputErrorClass, ...rest}){
  const error = document.querySelector('#' + input.id + '-error');
  error.textContent = input.validationMessage;
  error.classList.add(errorClass);
  input.classList.add(inputErrorClass);
}

// Hides error message
function hideErrorMessage(input, form, {errorClass, inputErrorClass, ...rest}){
  const error = document.querySelector('#' + input.id + '-error');
  error.textContent = '';
  error.classList.remove(errorClass);
  input.classList.remove(inputErrorClass);
}

// Checks if an input is valid
function checkInputValidity(input, form, rest) {
  if(input.validity.valid) {
    hideErrorMessage(input, form, rest);
  } else {
    showErrorMessage(input, form, rest);
  }
}

// Controls the buttons active state based on all input valid states
function toggleButtonState(inputs, button, {inactiveButtonClass, ...rest}) {
  const isValid = inputs.every(input => input.validity.valid);
  if(isValid) {
    button.classList.remove(inactiveButtonClass);
  } else {
    button.classList.add(inactiveButtonClass);
  }
}

// Browsers seem to display their own error message when the input is required, can't seem to prevent it
// Initializes validation for all forms
function enableValidation({formSelector, inputSelector, submitButtonSelector, ...rest}) {
  const forms = Array.from(document.querySelectorAll(formSelector));

  forms.forEach((form) => {
    form.addEventListener('submit', ((e) => {
      e.preventDefault();
    }))

    const inputs = Array.from(form.querySelectorAll(inputSelector));
    const button = form.querySelector(submitButtonSelector);

    button.addEventListener('click', (e) => {
      inputs.forEach((input) => {
        checkInputValidity(input, form, rest);
      })
    })

    toggleButtonState(inputs, button, rest);

    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        checkInputValidity(input, form, rest);
        toggleButtonState(inputs, button, rest);
      })
    })
  })
}

// Unsure if it is correct to store the selectors inside a const for this function,
// becuase for enableValidation is a part of the function call
// This was the only way I could think of reevaluating the form when it is opened

// Reevaluate form validity when form is opened
function reevaluateValidity(form) {

  const inputs = Array.from(form.querySelectorAll(".popup__input"));
  const button = form.querySelector(".popup__button");
  const selectors = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
  }

  // Set button state
  toggleButtonState(inputs, button, selectors)

  // Reset error messages
  inputs.forEach((input) => {
    hideErrorMessage(input, form, selectors)
  })
}


enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
});

