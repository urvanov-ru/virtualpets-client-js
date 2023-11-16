
export default class BookService {
  static get SERVICE_URL() { return '/rest/v1/BookService'; }
  #restClient;
  
  getPetBooks() {
    console.debug('getPetBooks');
    return this.#restClient.fetch(BookService.SERVICE_URL + "/getPetBooks", 'GET');
  }

  set restClient(restClient) {
    this.#restClient = restClient;
  }
}
