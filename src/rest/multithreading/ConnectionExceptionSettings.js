export default class ConnectionExceptionSettings {
  static get MAX_ATTEMPT_NUMBER() { return 3; }
  restart = false;
  delay = 60000;
  #attemptNumber = 0;
  
  get attemptNumber() {
    return this.#attemptNumber;
  }
  incAttemptNumber() {
    this.#attemptNumber++;
    if (this.#attemptNumber > ConnectionExceptionSettings.MAX_ATTEMPT_NUMBER) {
      this.#attemptNumber = ConnectionExceptionSettings.MAX_ATTEMPT_NUMBER;
    }
  }
  
}
