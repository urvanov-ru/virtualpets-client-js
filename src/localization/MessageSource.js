import i18n from 'roddeh-i18n';

export default class MessageSource {
  
  constructor(i18n) {
  }

  getMessage(... args) {
    console.debug('i18n %s = %s', args[0], i18n(args[0]));
    return i18n(args[0], args[1]);
  }
}