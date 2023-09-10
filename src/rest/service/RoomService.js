
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
  }
  
  upgradeMachineWithDrinks() {
  }
  
  pickJournalOnFloor() {
  }
  
  journalClosed() {
  }
  
  set restClient(restClient) {
    this.#restClient = restClient;
  }
}
