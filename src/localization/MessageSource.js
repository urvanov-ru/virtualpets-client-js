import i18n from 'roddeh-i18n';

export default class MessageSource {
  
  #i18n;
  
  constructor(messages) {
    this.#i18n = i18n.create(messages);
  }

  getMessage(... args) {
    console.debug('i18n %s = %s', args[0], this.#i18n(args[0]));
    return this.#i18n(args[0]);
  }
}