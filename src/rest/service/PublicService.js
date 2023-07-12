
import GetServersArg from '../domain/GetServersArg.js';
import LoginResult from '../domain/LoginResult.js';
import RecoverPasswordArg from '../domain/RecoverPasswordArg.js';
import RecoverPasswordResult from '../domain/RecoverPasswordResult.js';
import RecoverSessionArg from '../domain/RecoverSessionArg.js';
import RegisterArgument from '../domain/RegisterArgument.js';
import ServerInfo from '../domain/ServerInfo.js';
import ServerTechnicalInfo from '../domain/ServerTechnicalInfo.js';
import DaoException from '../domain/DaoException.js';
import ServiceException from '../domain/ServiceException.js';

export default class PublicService {

  #serviceUrl;
  
  /**
   * @return Promise ServerInfo[]
   */
  getServers(getServersArg) {
    return fetch(this.#serviceUrl + "/servers").then((response) => {
      if (!response.ok) throw new Error('Failed to retrieve servers.');
      return response.json();
    });
  }
  
  register(registerArgument) {}
  
  recoverPassword(recoverPasswordArg) {}
  recoverSession(recoverSessionArg) {}
  getServerTechnicalInfo(){};
  
  set serverUrl(serverUrl) {
    this.#serviceUrl = serverUrl + '/rest/v1/PublicService';
  }
}
