import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(caption, link){
    this._popupElement.querySelector('.preview-image__image').src = link;
    this._popupElement.querySelector('.preview-image__caption').textContent = caption;
    super.open();
  }

}

export default PopupWithImage;
