
export default class PetService {
  static get SERVICE_URL() { return '/rest/v1/PetService'; }
  #restClient;
  
  getUserPets() {
    console.debug('getUserPets');
    return this.#restClient.fetch(PetService.SERVICE_URL + "/getUserPets", 'GET');
  }
  
  create(createPetArg) {
    console.debug('create');
    return this.#restClient.fetch(PetService.SERVICE_URL + "/create", 'POST', createPetArg);
  }
  
  select(selectPetArg) {
    console.debug('select');
    return this.#restClient.fetch(PetService.SERVICE_URL + "/select", 'POST', selectPetArg);
  }
  
  drink(drinkArg) {
    console.debug('drink');
    return this.#restClient.fetch(PetService.SERVICE_URL + "/drink", 'POST', drinkArg);
  }
  
  satiety(satietyArg) {
    console.debug('satiety');
    return this.#restClient.fetch(PetService.SERVICE_URL + "/satiety", 'POST', satietyArg);
  }
  
  education() {
    console.debug('education');
    return this.#restClient.fetch(PetService.SERVICE_URL + "/education", 'POST');
  }
  
  mood() {
  }
  
  set restClient(restClient) {
    this.#restClient = restClient;
  }
}
