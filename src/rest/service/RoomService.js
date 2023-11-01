
export default class RoomService {
  static get SERVICE_URL() { return '/rest/v1/RoomService'; }
  #restClient;
  
  getRoomInfo() {
    console.debug('getRoomInfo');
    return this.#restClient.fetch(RoomService.SERVICE_URL + "/getRoomInfo", 'GET');
  }
  
  buildRefrigerator(point) {
  }
  
  moveRefrigerator(point) {
  }
  
  upgradeRefrigerator() {
  }
  
  openBoxNewbie(index) {
    console.debug('openBoxNewbie');
    return this.#restClient.fetch(RoomService.SERVICE_URL + "/openBoxNewbie/" + index + "/", 'POST', );
  }
  
  buildBookcase(point) {
  }
  
  upgradeBookcase() {
  }
  
  moveBookcase(point) {
  }
  
  buildMachineWithDrinks(point) {
  }
  
  moveMachineWithDrinks(point) {
  }
  
  getBuildMenuCosts() {
    console.debug('getBuildMenuCosts');
    return this.#restClient.fetch(RoomService.SERVICE_URL + "/getBuildMenuCosts", 'POST');
  }
  
  upgradeMachineWithDrinks() {
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
