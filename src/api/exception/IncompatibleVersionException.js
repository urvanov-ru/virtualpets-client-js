
import ServiceException from './ServiceException.js';

export default class IncompatibleVersionException extends ServiceException {
  serverVersion;
  clientVersion;
  constructor(serverVersion, clientVersion) {
    super(message);
    this.serverVersion = serverVersion;
    this.clientVersion = clientVersion;
    this.name = this.constructor.name;
  }
}
