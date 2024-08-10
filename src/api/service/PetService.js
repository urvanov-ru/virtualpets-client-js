
export default class PetService {
  static get SERVICE_URL() { return '/api/v1/PetService'; }
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
  
  delete(petId) {
    console.debug('delete');
    return this.#restClient.fetch(PetService.SERVICE_URL + "/delete/" + petId, 'DELETE');
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
    console.debug('mood');
    return this.#restClient.fetch(PetService.SERVICE_URL + "/mood", 'POST');
  }
  
  getPetBooks() {
    console.debug('getPetBooks');
    return this.#restClient.fetch(PetService.SERVICE_URL + "/getPetBooks", 'GET');
  }
  
  getPetCloths() {
    console.debug('getPetCloths');
    return this.#restClient.fetch(PetService.SERVICE_URL + "/getPetCloths", 'GET');
  }
  
  saveCloth(savePetClothsArg) {
    console.debug('savePetCloths');
    return this.#restClient.fetch(PetService.SERVICE_URL + "/savePetCloths", 'POST', savePetClothsArg);
  }
  
  getPetDrinks() {
    console.debug('getPetDrinks');
    return this.#restClient.fetch(PetService.SERVICE_URL + "/getPetDrinks", 'GET');
  }
  
  getPetFoods() {
    console.debug('getPetFoods');
    return this.#restClient.fetch(PetService.SERVICE_URL + "/getPetFoods", 'GET');
  }
  
  getPetJournalEntries(count) {
    console.debug('getPetJournalEntries');
    return this.#restClient.fetch(PetService.SERVICE_URL + "/getPetJournalEntries?count=" + count, 'GET');
  }
  
  getPetRucksackInner() {
    console.debug('getPetRucksackInner');
    return this.#restClient.fetch(PetService.SERVICE_URL + "/getPetRucksackInner", 'GET');
  }
  
  set restClient(restClient) {
    this.#restClient = restClient;
  }
}
