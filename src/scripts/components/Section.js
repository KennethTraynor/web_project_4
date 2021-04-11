class Section {
  constructor({items, renderer}, wrapperSelector){
    this._items = items;
    this._renderer = renderer;
    this._wrapper = document.querySelector(wrapperSelector);
  }

  renderer() {
    this._renderer(this._items);
  }

  addItem(element) {
    this._wrapper.prepend(element);
  }

}
