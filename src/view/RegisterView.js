// localization
import StringConstants from '../localization/StringConstants.js';

import {mainContainerElement} from './container.js';

// view
import BaseHtmlView from './BaseHtmlView.js';

export default class RegisterView extends BaseHtmlView {
  #registerListeners =[];
  #hideListeners = [];
  

  #loginLabel;
  #loginInput;
  #passwordLabel;
  #passwordInput;
  #emailLabel;
  #emailInput;
  #registerButton;
  #host;
  #initialized = false;
  version;
  settings;
  #waitPanel;

  messageSource;
  resourceManager;
  
  constructor() {
    super();
  }
  
  showView(host) {
    super.showView();
    this.#host = host;
    if (!this.#initialized) {
      this.#loginLabel = document.createElement('label');
      this.#loginInput = document.createElement('input');
      this.#passwordLabel = document.createElement('label');
      this.#passwordInput = document.createElement('input');
      this.#emailLabel = document.createElement('label');
      this.#emailInput = document.createElement('input');
      this.#registerButton = document.createElement('button');
      
      this.#passwordInput.type = 'password';
      this.#emailInput.type = 'email';
      
      this.#loginLabel.innerText = this.messageSource.getMessage(
                    StringConstants.NAME, null, null);
      this.#passwordLabel.innerText = this.messageSource.getMessage(
                    StringConstants.PASSWORD, null, null);
      this.#emailLabel.innerText = this.messageSource.getMessage(
                    StringConstants.EMAIL, null, null);
      this.#registerButton.innerText = this.messageSource.getMessage(
                    StringConstants.REGISTER, null, null);

      
      this.containerDiv.append(this.#loginLabel);
      this.containerDiv.append(this.#loginInput);
      this.containerDiv.append(this.#passwordLabel);
      this.containerDiv.append(this.#passwordInput);
      this.containerDiv.append(this.#emailLabel);
      this.containerDiv.append(this.#emailInput);
      this.containerDiv.append(this.#registerButton);
      

      
      this.#registerButton.addEventListener('click', this.onRegisterClicked.bind(this));
    
      
      
      this.#initialized = true;
    }
    
    this.containerDiv.style.display = 'flex';
  }
  
  hideView() {
    super.hideView();
  }
  
  get element() {
    return this.containerDiv;
  }
  
  onRegisterClicked() {
    
  }
  
  addRegisterListener(listener) {
    this.#registerListeners.push(listener);
  }
  
  addHideListener(listener) {
    this.#hideListeners.push(listener);
  }
  
  set host(host) {
    this.#host = host;
  }
  
}