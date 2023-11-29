
export default class HiddenObjectsService {
  static get SERVICE_URL() { return '/rest/v1/HiddenObjectsService'; }
  #restClient;

  joinGame(joinHiddenObjectsGameArg) {
  }
  
  getGameInfo() {
    console.debug('getGameInfo');
    return this.#restClient.fetch(BookService.SERVICE_URL + "/getGameInfo", 'GET');
  }
  
  collectObject(collectObjectArg) {
    console.debug('collectObject');
    return this.#restClient.fetch(BookService.SERVICE_URL + "/collectObject", 'POST');
  }
  
  startGame() {
    console.debug('startGame');
    return this.#restClient.fetch(BookService.SERVICE_URL + "/startGame", 'POST');
  }
  
  leaveGame() {
    console.debug('leaveGame');
    return this.#restClient.fetch(BookService.SERVICE_URL + "/leaveGame", 'POST');
  }

  set restClient(restClient) {
    this.#restClient = restClient;
  }
}
