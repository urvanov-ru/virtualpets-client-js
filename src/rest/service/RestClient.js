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
    if (!this.sessionId) {
      options.headers.append('Authorization', 'Basic ' + btoa(this.#username + ":" + this.#password));
    } else {
      options.headers.append("JSESSIONID", this.sessionId);
    }
    options.headers.append('Content-Type', 'application/json');
    options.body = JSON.stringify(requestBody);
    options.cache = 'no-cache';
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