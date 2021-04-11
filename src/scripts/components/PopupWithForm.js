import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
  }

  _getInputValues() {
    const values = {}
    const inputs = Array.from(this._form.querySelectorAll('.popup__input'));

    inputs.forEach(inputs => {
      values[inputs.name] = input.value;
    })

    return values;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form = this._popupElement.querySelector('.popup__form');
    this._form.addEventListener('submit', (e) => {
      this._submitHandler();
    })
  }

  close() {
    super.close();
    this._form.reset();
  }

}

export default PopupWithForm;
