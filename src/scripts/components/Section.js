class Section {
  constructor({items, renderer}, wrapperSelector){
    this._items = items;
    this._renderer = renderer;
    this._wrapper = document.querySelector(wrapperSelector);

  }

  renderer() {
    this._items.forEach((item) => {
      this._renderer(item);
    })
  }

  addItem(element) {
    this._wrapper.prepend(element);
  }

}

export default Section;
