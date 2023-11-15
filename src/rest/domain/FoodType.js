export default class FoodType {
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
          FoodType.CARROT,
          FoodType.DRY_FOOD,
          FoodType.FISH,
          FoodType.ICE_CREAM,
          FoodType.APPLE,
          FoodType.CABBAGE,
          FoodType.CHOCOLATE,
          FoodType.FRENCH_FRIES,
          FoodType.JAPANESE_ROLLS,
          FoodType.PIE,
          FoodType.POTATOES,
          FoodType.SANDWICH,
          FoodType.BANANA,
          FoodType.WATERMELON];
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
