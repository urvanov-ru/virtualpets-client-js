
export default class HiddenObjectsService {
  static get SERVICE_URL() { return '/rest/v1/HiddenObjectsService'; }
  #restClient;

  joinGame(joinHiddenObjectsGameArg) {
    console.debug('joinGame');
    return this.#restClient.fetch(HiddenObjectsService.SERVICE_URL + "/joinGame", 'POST', joinHiddenObjectsGameArg);
  }
  
  getGameInfo() {
    console.debug('getGameInfo');
    return this.#restClient.fetch(HiddenObjectsService.SERVICE_URL + "/getGameInfo", 'GET');
  }
  
  collectObject(collectObjectArg) {
    console.debug('collectObject');
    return this.#restClient.fetch(HiddenObjectsService.SERVICE_URL + "/collectObject", 'POST', collectObjectArg);
  }
  
  startGame() {
    console.debug('startGame');
    return this.#restClient.fetch(HiddenObjectsService.SERVICE_URL + "/startGame", 'POST');
  }
  
  leaveGame() {
    console.debug('leaveGame');
    return this.#restClient.fetch(HiddenObjectsService.SERVICE_URL + "/leaveGame", 'POST');
  }

  set restClient(restClient) {
    this.#restClient = restClient;
  }
}
