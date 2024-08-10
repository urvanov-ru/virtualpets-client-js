
export default class RoomService {
  static get SERVICE_URL() { return '/api/v1/RoomService'; }
  #restClient;
  
  getRoomInfo() {
    console.debug('getRoomInfo');
    return this.#restClient.fetch(RoomService.SERVICE_URL + "/getRoomInfo", 'GET');
  }
  
  buildRefrigerator(point) {
    console.debug('buildRefrigerator');
    return this.#restClient.fetch(RoomService.SERVICE_URL + "/buildRefrigerator", 'POST', point);
  }
  
  moveRefrigerator(point) {
    console.debug('moveRefrigerator');
    return this.#restClient.fetch(RoomService.SERVICE_URL + "/moveRefrigerator", 'POST', point);
  }
  
  upgradeRefrigerator() {
    console.debug('upgradeRefrigerator');
    return this.#restClient.fetch(RoomService.SERVICE_URL + "/upgradeRefrigerator", 'POST');
  }
  
  openBoxNewbie(index) {
    console.debug('openBoxNewbie');
    return this.#restClient.fetch(RoomService.SERVICE_URL + "/openBoxNewbie/" + index + "/", 'POST', );
  }
  
  buildBookcase(point) {
    console.debug('buildBookcase');
    return this.#restClient.fetch(RoomService.SERVICE_URL + "/buildBookcase", 'POST', point);
  }
  
  upgradeBookcase() {
    console.debug('upgradeBookcase');
    return this.#restClient.fetch(RoomService.SERVICE_URL + "/upgradeBookcase", 'POST');
  }
  
  moveBookcase(point) {
    console.debug('moveBookcase %o.', point);
    return this.#restClient.fetch(RoomService.SERVICE_URL + "/moveBookcase", 'POST', point);
  }
  
  buildMachineWithDrinks(point) {
    console.debug('buildMachineWithDrinks');
    return this.#restClient.fetch(RoomService.SERVICE_URL + "/buildMachineWithDrinks", 'POST', point);
  }
  
  moveMachineWithDrinks(point) {
    console.debug('moveMachineWithDrinks %o.', point);
    return this.#restClient.fetch(RoomService.SERVICE_URL + "/moveMachineWithDrinks", 'POST', point);
  }
  
  getBuildMenuCosts() {
    console.debug('getBuildMenuCosts');
    return this.#restClient.fetch(RoomService.SERVICE_URL + "/getBuildMenuCosts", 'POST');
  }
  
  upgradeMachineWithDrinks() {
    console.debug('upgradeMachineWithDrinks');
    return this.#restClient.fetch(RoomService.SERVICE_URL + "/upgradeMachineWithDrinks", 'POST');
  }
  
  pickJournalOnFloor() {
    console.debug('pickJournalOnFloor');
    return this.#restClient.fetch(RoomService.SERVICE_URL + "/pickJournalOnFloor", 'POST');
  }
  
  journalClosed() {
    console.debug('journalClosed');
    return this.#restClient.fetch(RoomService.SERVICE_URL + "/journalClosed", 'POST');
  }
  
  set restClient(restClient) {
    this.#restClient = restClient;
  }
}
