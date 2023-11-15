
export default class FoodService {
  static get SERVICE_URL() { return '/rest/v1/FoodService'; }
  #restClient;
  
  getPetFoods() {
    console.debug('getPetFoods');
    return this.#restClient.fetch(FoodService.SERVICE_URL + "/getPetFoods", 'GET');
  }

  set restClient(restClient) {
    this.#restClient = restClient;
  }
}
