export default class UserService {
   #version
   #restClient;

  login(loginArg) {
    console.debug('login');
    return this.#restClient.fetch("/login", 'POST', loginArg);
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