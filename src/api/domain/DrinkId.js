export default class DrinkId {
  static get WATER() { return "WATER"; }
  static get MILK() { return "MILK"; }
  static get BOTTLE() { return "BOTTLE"; }
  static get TEA() { return "TEA"; }
  static get COFFEE() { return "COFFEE"; }
  static get ORANGE_JUICE() { return "ORANGE_JUICE"; }
  
  static get VALUES_COUNT() { return 6; }
  
  
  static #values;
  static #stringToIndexMap;
  static #indexToStringMap;
  
  static {
    this.#values = [
        DrinkId.WATER,
        DrinkId.MILK,
        DrinkId.BOTTLE,
        DrinkId.TEA,
        DrinkId.COFFEE,
        DrinkId.ORANGE_JUICE];
    this.#stringToIndexMap = new Map();
    this.#indexToStringMap = new Map();
    for (let n = 0; n < this.#values.length; n++) {
      this.#stringToIndexMap.set(this.#values[n], n);
      this.#indexToStringMap.set(n, this.#values[n]);
    }
  }
  
  static ordinal(key) {
    return this.#stringToIndexMap.get(key);
  }
  
  static name(index) {
    return this.#indexToStringMap.get(index);
  }
  
  static get values() {
    return this.#values.slice();
  }
  
  static get length() {
    return this.#values.length;
  }
}
