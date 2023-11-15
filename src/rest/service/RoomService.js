
export default class RoomService {
  static get SERVICE_URL() { return '/rest/v1/RoomService'; }
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
    console.debug('buildMachineWithDrinks');
    return this.#restClient.fetch(RoomService.SERVICE_URL + "/buildMachineWithDrinks", 'POST');
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
