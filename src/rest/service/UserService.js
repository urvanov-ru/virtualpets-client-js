export default class UserService {
  static get SERVICE_URL() { return '/rest/v1/UserService'; }
  #version
  #restClient;

  login(loginArg) {
    console.debug('login');
    return this.#restClient.fetch(UserService.SERVICE_URL + "/login", 'POST', loginArg);
  }

  getUsersOnline(refreshUsersOnlineArg) {
  }

  getUserInformation(userInformationArg) {
  }
  
  updateUserInformation(userInformation) {
  }
  
  closeSession() {
  }
  
  set version(version) {
    this.#version = version;
  }
  
  set restClient(restClient) {
    this.#restClient = restClient;
  }
}