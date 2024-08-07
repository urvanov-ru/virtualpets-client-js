
import GetServersArg from '../domain/GetServersArg.js';
import LoginResult from '../domain/LoginResult.js';
import RecoverPasswordArg from '../domain/RecoverPasswordArg.js';
import RecoverPasswordResult from '../domain/RecoverPasswordResult.js';
import RecoverSessionArg from '../domain/RecoverSessionArg.js';
import RegisterArgument from '../domain/RegisterArgument.js';
import ServerInfo from '../domain/ServerInfo.js';
import ServerTechnicalInfo from '../domain/ServerTechnicalInfo.js';

export default class PublicService {
  static get SERVICE_URL() { return '/rest/v1/PublicService'; }
  #restClient;
  
  ///**
  // * @return Promise ServerInfo[]
  // */
  //getServers(getServersArg) {
  //  console.debug('fetch servers');
  //  return fetch(this.#serviceUrl + "/servers?version="+this.#version);
  //}
  
  login(loginArg) {
    console.debug('login');
    return this.#restClient.fetch(PublicService.SERVICE_URL + "/login", 'POST', loginArg);
  }
  
  checkSession() {
    console.debug('checkSession');
    return this.#restClient.fetch(PublicService.SERVICE_URL + "/checkSession", 'GET');
  }
  
  register(registerArgument) {
    console.debug('register');
    return this.#restClient.fetch(PublicService.SERVICE_URL + "/register", 'POST', registerArgument);
  }
  
  recoverPassword(recoverPasswordArg) {}
  recoverSession(recoverSessionArg) {}
  getServerTechnicalInfo(){};
  
  set restClient(restClient) {
    this.#restClient = restClient;
  }
}
