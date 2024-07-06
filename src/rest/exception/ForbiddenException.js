
import ServiceException from './ServiceException.js';

export default class ForbiddenException extends ServiceException {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}
