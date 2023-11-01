export default class BuildingMaterialType {
  static get TIMBER() { return "TIMBER"; }
  static get BOARD() { return "BOARD"; }
  static get STONE() { return "STONE"; }
  static get CHIP() { return "CHIP"; }
  static get WIRE() { return "WIRE"; }
  static get IRON() { return "IRON"; }
  static get OIL() { return "OIL"; }
  static get BLUE_CRYSTAL() { return "BLUE_CRYSTAL"; }
  static get RUBBER() { return "RUBBER"; }
  
  #values;
  #stringToIndexMap;
  #indexToStringMap;
  
  static {
    this.#values = [TIMBER, BOARD, STONE, CHIP, WIRE, IRON, OIL, BLUE_CRYSTAL, RUBBER];
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
    return this.#indexToStringMap(index);
  }
  
  static get values() {
    return this.#values.slice();
  }
  
  static get length() {
    return this.#values.length;
  }
}
