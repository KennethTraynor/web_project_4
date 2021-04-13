import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._previewImage = this._popupElement.querySelector('.preview-image__image');
    this._previewCaption = this._popupElement.querySelector('.preview-image__caption');
  }

  open(caption, link) {
    this._previewImage.src = link;
    this._previewCaption.textContent = caption;
    super.open();
  }

}

export default PopupWithImage;
