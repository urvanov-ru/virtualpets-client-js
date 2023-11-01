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
  
  static #values;
  static #stringToIndexMap;
  static #indexToStringMap;
  
  static {
    this.#values = [BuildingMaterialType.TIMBER,
        BuildingMaterialType.BOARD,
        BuildingMaterialType.STONE,
        BuildingMaterialType.CHIP,
        BuildingMaterialType.WIRE,
        BuildingMaterialType.IRON,
        BuildingMaterialType.OIL,
        BuildingMaterialType.BLUE_CRYSTAL,
        BuildingMaterialType.RUBBER];
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
