
export default class TownService {
  static get SERVICE_URL() { return '/rest/v1/TownService'; }
  #restClient;
  
  getPetBooks() {
    console.debug('getTownInfo');
    return this.#restClient.fetch(BookService.SERVICE_URL + "/getTownInfo", 'GET');
  }

  set restClient(restClient) {
    this.#restClient = restClient;
  }
  
}
