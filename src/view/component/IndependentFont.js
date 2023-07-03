
export default class IndependentFont {
  #size;
  
  constructor(size) {
    this.#size = size;
  }
  
  get size() {
    return this.#size;
  }
}
