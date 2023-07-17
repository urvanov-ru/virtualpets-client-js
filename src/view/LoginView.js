import StringConstants from '../localization/StringConstants.js';
import BackgroundWork from '../rest/multithreading/BackgroundWork.js';
import {mainContainerElement} from './container.js';

export default class LoginView {
  #loginListeners;
  #registerListeners;
  #recoverPasswordListeners;

  messageSource;
  #progressFrame;
  settings;
  connectionInfo;
  resourceManager;
  #registerFrame;
  #version;
  #userPetsFrame;
  #recoverPasswordFrame;
  #restoreSessionPanel;
  #cancelRestoreSessionButton;
  #restoreSessionLabel;
  
  #loginLabel;
  #loginInput;
  #passwordLabel;
  #passwordInput;
  #registerButton;
  #loginButton;
  #revivePasswordButton;
  #containerDiv;
  
  #initialized = false;
  
  constructor() {
    
  }
  
  showView() {
    if (!this.#initialized) {
      this.#loginLabel = document.createElement('label');
      this.#loginInput = document.createElement('input');
      this.#passwordLabel = document.createElement('label');
      this.#passwordInput = document.createElement('input');
      this.#registerButton = document.createElement('button');
      this.#loginButton = document.createElement('button');
      this.#revivePasswordButton = document.createElement('button');
      this.#containerDiv = document.createElement('div');
      
      this.#containerDiv.style.width = '100%';
      this.#containerDiv.style.height = '100%';
      this.#containerDiv.style.display = 'none';
      this.#containerDiv.style.flexDirection = 'column';
    
      this.#loginLabel.for = this.#loginInput;
      this.#passwordLabel.for = this.#passwordInput;
      
      this.#loginLabel.innerText = this.messageSource.getMessage(StringConstants.NAME);
      this.#passwordLabel.innerText = this.messageSource.getMessage(StringConstants.PASSWORD);
      this.#registerButton.innerText = this.messageSource.getMessage(StringConstants.REGISTER);
      this.#loginButton.innerText = this.messageSource.getMessage(StringConstants.LOGIN);
      this.#revivePasswordButton.innerText = this.messageSource.getMessage(StringConstants.REVIVE_PASSWORD);
      
      
      this.#containerDiv.append(this.#loginLabel);
      this.#containerDiv.append(this.#loginInput);
      this.#containerDiv.append(this.#passwordLabel);
      this.#containerDiv.append(this.#passwordInput);
      this.#containerDiv.append(this.#registerButton);
      this.#containerDiv.append(this.#loginButton);
      this.#containerDiv.append(this.#revivePasswordButton);
      
      mainContainerElement().append(this.#containerDiv);
      
      this.#initialized = true;
    }
    this.#containerDiv.style.display = 'flex';
  }
  
  hideView() {
    this.#containerDiv.style.display = 'none';
  }


  addLoginListener(simpleEventListener) {
    this.#loginListeners.add(simpleEventListener);
  }

  addRegisterListener(simpleEventListener) {
    this.#registerListeners.add(simpleEventListener);
  }

  addRecoverPasswordListener(simpleEventListener) {
    this.#recoverPasswordListeners.add(simpleEventListener);
  }

  
}