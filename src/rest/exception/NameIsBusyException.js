
import ServiceException from './ServiceException.js';

export default class NameIsBusyException extends ServiceException {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}
