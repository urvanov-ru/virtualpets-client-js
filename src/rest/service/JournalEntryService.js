
export default class JournalEntryService {
  static get SERVICE_URL() { return '/rest/v1/JournalEntryService'; }
  #restClient;
  
  getPetJournalEntries(count) {
    console.debug('getPetJournalEntries');
    return this.#restClient.fetch(JournalEntryService.SERVICE_URL + "/getPetJournalEntries?count=" + count, 'GET');
  }
  
  set restClient(restClient) {
    this.#restClient = restClient;
  }
}
