export default class RestClient {
  #serverUrl;
  #version;
  #settings;
  #username;
  #password;
  sessionId;
  
  fetch(resource, method, requestBody) {
    const options = {};
    options.method = method;
    options.headers = new Headers();
    options.headers.append('Content-Type', 'application/json');
    if (requestBody) {
      options.body = JSON.stringify(requestBody);
    }
    options.cache = 'no-cache';
    options.credentials = 'include';
    return fetch(this.#serverUrl + resource, options);
  }
  
  set serverUrl(serverUrl) {
    this.#serverUrl = serverUrl;
  }
  
  set version(version) {
    this.#version = version;
  }
  
  set settings(settings) {
    this.#settings = settings;
  }
  
  set username(username) {
    this.#username = username;
  }
  
  set password(password) {
    this.#password = password;
  }
}