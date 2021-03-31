class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._form = formElement;
  }

  _showInputError(input) {
    const error = this._form.querySelector('#' + input.id + '-error');
    input.classList.add(this._inputErrorClass);
    error.textContent = input.validationMessage;
    error.classList.add(this._errorClass);
  }

  _hideInputError(input) {
    const error = this._form.querySelector('#' + input.id + '-error');
    input.classList.remove(this._inputErrorClass);
    error.textContent = '';
    error.classList.remove(this._errorClass);
  }

  _checkInputValidity(input) {
    if (input.validity.valid) {
      this._hideInputError(input);
    } else {
      this._showInputError(input);
    }
  }

  _toggleButtonState(inputs, button) {
    const isValid = inputs.every(input => input.validity.valid);
    if (isValid) {
      button.classList.remove(this._inactiveButtonClass);
    } else {
      button.classList.add(this._inactiveButtonClass);
    }
  }

  _setEventListeners() {
    const inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    const button = this._form.querySelector(this._submitButtonSelector);

    button.addEventListener('click', () => {
      inputs.forEach((input) => {
        this._checkInputValidity(input);
      })
    })

    this._toggleButtonState(inputs, button);

    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState(inputs, button);
      });
    });
  }

  recheckValiditiy() {
    const inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    const button = this._form.querySelector(this._submitButtonSelector);

    this._toggleButtonState(inputs, button);

    inputs.forEach((input) => {
        this._hideInputError(input);
    });
  }

  enableValidation() {

    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
    });

    this._setEventListeners();

  }

}

export default FormValidator;
