export default class DrinkId {
  static get CARROT() { return "CARROT"; }
  static get DRY_FOOD() { return "DRY_FOOD"; }
  static get FISH() { return "FISH"; }
  static get ICE_CREAM() { return "ICE_CREAM"; }
  static get APPLE() { return "APPLE"; }
  static get CABBAGE() { return "CABBAGE"; }
  static get CHOCOLATE() { return "CHOCOLATE"; }
  static get FRENCH_FRIES() { return "FRENCH_FRIES"; }
  static get JAPANESE_ROLLS() { return "JAPANESE_ROLLS"; }
  static get PIE() { return "PIE"; }
  static get POTATOES() { return "POTATOES"; }
  static get SANDWICH() { return "SANDWICH"; }
  static get BANANA() { return "BANANA"; }
  static get WATERMELON() { return "WATERMELON"; }
  
  static get VALUES_COUNT() { return 14; }
  
  
  
  static #values;
  static #stringToIndexMap;
  static #indexToStringMap;
  
  static {
    this.#values = [
          DrinkId.CARROT,
          DrinkId.DRY_FOOD,
          DrinkId.FISH,
          DrinkId.ICE_CREAM,
          DrinkId.APPLE,
          DrinkId.CABBAGE,
          DrinkId.CHOCOLATE,
          DrinkId.FRENCH_FRIES,
          DrinkId.JAPANESE_ROLLS,
          DrinkId.PIE,
          DrinkId.POTATOES,
          DrinkId.SANDWICH,
          DrinkId.BANANA,
          DrinkId.WATERMELON];
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
