
export default class RoomService {
  static get SERVICE_URL() { return '/rest/v1/DrinkService'; }
  #restClient;
  
  getPetDrinks() {
    console.debug('getPetDrinks');
    return this.#restClient.fetch(RoomService.SERVICE_URL + "/getPetDrinks", 'GET');
  }

  set restClient(restClient) {
    this.#restClient = restClient;
  }
}
