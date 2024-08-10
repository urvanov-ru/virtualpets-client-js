export default class NotNowException extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}