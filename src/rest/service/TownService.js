
export default class TownService {
  static get SERVICE_URL() { return '/rest/v1/TownService'; }
  #restClient;
  
  getTownInfo() {
    console.debug('getTownInfo');
    return this.#restClient.fetch(TownService.SERVICE_URL + "/getTownInfo", 'GET');
  }

  set restClient(restClient) {
    this.#restClient = restClient;
  }
  
}
