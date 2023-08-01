
import GetServersArg from '../domain/GetServersArg.js';
import LoginResult from '../domain/LoginResult.js';
import RecoverPasswordArg from '../domain/RecoverPasswordArg.js';
import RecoverPasswordResult from '../domain/RecoverPasswordResult.js';
import RecoverSessionArg from '../domain/RecoverSessionArg.js';
import RegisterArgument from '../domain/RegisterArgument.js';
import ServerInfo from '../domain/ServerInfo.js';
import ServerTechnicalInfo from '../domain/ServerTechnicalInfo.js';

export default class PublicService {

  #serviceUrl;
  #version;
  
  /**
   * @return Promise ServerInfo[]
   */
  getServers(getServersArg) {
    console.debug('fetch servers');
    return fetch(this.#serviceUrl + "/servers?version="+this.#version);
  }
  
  register(registerArgument) {}
  
  recoverPassword(recoverPasswordArg) {}
  recoverSession(recoverSessionArg) {}
  getServerTechnicalInfo(){};
  
  set serverUrl(serverUrl) {
    this.#serviceUrl = serverUrl + '/rest/v1/PublicService';
  }
  
  set version(version) {
    this.#version = version;
  }
}
