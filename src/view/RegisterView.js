// localization
import StringConstants from '../localization/StringConstants.js';

import {mainContainerElement} from './container.js';

// view
import BaseHtmlView from './BaseHtmlView.js';

// rest
import RegisterArgument from '../rest/domain/RegisterArgument.js';

export default class RegisterView extends BaseHtmlView {
  #registerListeners =[];
  #hideListeners = [];
  

  #loginLabel;
  #loginInput;
  #passwordLabel;
  #passwordInput;
  #nameLabel;
  #nameInput;
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
      this.#nameLabel = document.createElement('label');
      this.#nameInput = document.createElement('input');
      this.#emailLabel = document.createElement('label');
      this.#emailInput = document.createElement('input');
      this.#registerButton = document.createElement('button');
      
      this.#passwordInput.type = 'password';
      this.#emailInput.type = 'email';
      
      this.#loginLabel.innerText = this.messageSource.getMessage(
                    StringConstants.USERNAME, null, null);
      this.#passwordLabel.innerText = this.messageSource.getMessage(
                    StringConstants.PASSWORD, null, null);
      this.#nameLabel.innerText = this.messageSource.getMessage(
                    StringConstants.NAME, null, null);
      this.#emailLabel.innerText = this.messageSource.getMessage(
                    StringConstants.EMAIL, null, null);
      this.#registerButton.innerText = this.messageSource.getMessage(
                    StringConstants.REGISTER, null, null);

      
      this.containerDiv.append(this.#loginLabel);
      this.containerDiv.append(this.#loginInput);
      this.containerDiv.append(this.#passwordLabel);
      this.containerDiv.append(this.#passwordInput);
      this.containerDiv.append(this.#nameLabel);
      this.containerDiv.append(this.#nameInput);
      this.containerDiv.append(this.#emailLabel);
      this.containerDiv.append(this.#emailInput);
      this.containerDiv.append(this.#registerButton);
      

      
      this.#registerButton.addEventListener('click', this.onRegisterClicked.bind(this));
    
      
      
      this.#initialized = true;
      this.title = this.messageSource.getMessage(StringConstants.REGISTER_VIEW_TITLE);
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
    const registerArgument = new RegisterArgument();
    registerArgument.host = this.#host;
    registerArgument.login = this.#loginInput.value;
    registerArgument.password = this.#passwordInput.value;
    registerArgument.name = this.#nameInput.value;
    registerArgument.email = this.#emailInput.value;
    registerArgument.version = this.version;  
    for (let listener of this.#registerListeners) {
      listener(this, registerArgument);
    }
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