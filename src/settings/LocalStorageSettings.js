import Settings from './Settings.js';


export default class LocalStorageSettings extends Settings {


  static get PREFIX() { return "ru.urvanov.virtualpets."; }

  /**
   * Вызывает метод load().
   */
  constructor() {
    load();
  }

  #getFromLocalStorage(settingName, defaultValue) {
    const result = localStorage[PREFIX + settingName];
    if (result !== undefined) {
      return result;
    }
    return defaultValue;
  }
  
  #setToLocalStorage(settingName, value) {
    localStorage[PREFIX + settingName] = value;
  }

  /**
   * Загружает настройки.
   */
  load() {
    this.host = this.#getFromLocalStorage("host", "");
    this.login = this.#getFromLocalStorage("login", "");
    this.unid = this.#getFromLocalStorage("unid", "");
    this.petId = this.#getFromLocalStorage("petId", 0);
    this.userId = this.#getFromLocalStorage("userId", 0);
  }

  /**
   * Сохраняет настройки.
   */
  save() {
    this.#setToLocalStorage("host", host);
    this.#setToLocalStorage("login", login);
    this.#setToLocalStorage("unid", unid);
    this.#setToLocalStorage("petId", petId);
    this.#setToLocalStorage("userId", userId);
  }

  get soundEnabled() {
    return this.#getFromLocalStorage("sound_enabled", true);
  }

  set soundEnabled(soundEnabled) {
    this.#setToLocalStorage("sound_enabled", soundEnabled);
  }

  setSetting(name, value) {
    this.#setToLocalStorage(name, value);
  }

  getSetting(name, defaultValue) {
    const result = this.#getFromLocalStorage(name);
    if (result !== null) {
      return result;
    } else {
      return defaultValue;
    }
  }
}
