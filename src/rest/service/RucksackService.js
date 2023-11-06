
export default class RucksackService {
  static get SERVICE_URL() { return '/rest/v1/RucksackService'; }
  #restClient;
  
  getPetRucksackInner() {
    console.debug('getPetRucksackInner');
    return this.#restClient.fetch(RucksackService.SERVICE_URL + "/getPetRucksackInner", 'GET');
  }

  set restClient(restClient) {
    this.#restClient = restClient;
  }
}
