const handleModalKeyDown = (evt) => {
  if(evt.key === "Escape"){
    closeModalWindow(document.querySelector('.popup_opened'));
  }
}

export const openModalWindow = (modalWindow) => {
  modalWindow.classList.add('popup_opened');
  document.addEventListener('keydown', handleModalKeyDown);
}

export const closeModalWindow = (modalWindow) => {
  modalWindow.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleModalKeyDown);
}
