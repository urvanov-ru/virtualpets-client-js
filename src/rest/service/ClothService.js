
export default class ClothService {
  static get SERVICE_URL() { return '/rest/v1/ClothService'; }
  #restClient;
  
  
  getPetCloths() {
    console.debug('getPetCloths');
    return this.#restClient.fetch(ClothService.SERVICE_URL + "/getPetCloths", 'GET');
  }
  
  saveCloth(savePetClothsArg) {
    console.debug('savePetCloths');
    return this.#restClient.fetch(ClothService.SERVICE_URL + "/savePetCloths", 'POST', savePetClothsArg);
  }

  set restClient(restClient) {
    this.#restClient = restClient;
  }
}
