

export default class AuthenticationController {
  #restClient;

  setCredentials(login, password) {
    this.#restClient.username = login;
    this.#restClient.password = password;
    this.#restClient.sessionId = null;
  }
  
  clearCredentials() {
    this.#restClient.username = null;
    this.#restClient.password = null;
    this.#restClient.sessionId = null;
  }
  
  isAuthenticated() {
  }
  
  set authenticated(value) {
  }
  
  getSessionId() {
    return this.#restClient.sessionId;
  }
  
  set restClient(restClient) {
    this.#restClient = restClient;
  }
}
