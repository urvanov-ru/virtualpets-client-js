// localization
import StringConstants from '../localization/StringConstants.js';

// trayIcon
import MessageType from '../trayicon/MessageType.js';

// view
import BaseHtmlView from './BaseHtmlView.js';

import BackgroundWork from '../rest/multithreading/BackgroundWork.js';
import {mainContainerElement} from './container.js';

export default class LoginView extends BaseHtmlView {
  #loginListeners = [];
  #registerListeners = [];
  #recoverPasswordListeners = [];
  #restoreSessionListeners = [];

  messageSource;
  trayIcon;
  #progressFrame;
  settings;
  connectionInfo;
  resourceManager;
  #registerFrame;
  #servers;
  #version;
  #userPetsFrame;
  #recoverPasswordFrame;
  #restoreSessionPanel;
  #cancelRestoreSessionButton;
  #restoreSessionLabel;
  
  #serverLabel;
  #serverSelect;
  #loginLabel;
  #loginInput;
  #passwordLabel;
  #passwordInput;
  #registerButton;
  #loginButton;
  #revivePasswordButton;
  
  #initialized = false;
  
  constructor() {
    super();
  }
  
  showView() {
    super.showView();
    if (!this.#initialized) {
      this.#serverLabel = document.createElement('label');
      this.#serverSelect = document.createElement('select');
      this.#loginLabel = document.createElement('label');
      this.#loginInput = document.createElement('input');
      this.#passwordLabel = document.createElement('label');
      this.#passwordInput = document.createElement('input');
      this.#registerButton = document.createElement('button');
      this.#loginButton = document.createElement('button');
      this.#revivePasswordButton = document.createElement('button');
         
      this.#loginLabel.for = this.#loginInput;
      this.#passwordLabel.for = this.#passwordInput;
      
      this.#serverLabel.innerText = this.messageSource.getMessage(StringConstants.SERVER);
      this.#loginLabel.innerText = this.messageSource.getMessage(StringConstants.NAME);
      this.#passwordLabel.innerText = this.messageSource.getMessage(StringConstants.PASSWORD);
      this.#registerButton.innerText = this.messageSource.getMessage(StringConstants.REGISTER);
      this.#loginButton.innerText = this.messageSource.getMessage(StringConstants.LOGIN);
      this.#revivePasswordButton.innerText = this.messageSource.getMessage(StringConstants.REVIVE_PASSWORD);
      
      this.containerDiv.append(this.#serverLabel);
      this.containerDiv.append(this.#serverSelect);
      this.containerDiv.append(this.#loginLabel);
      this.containerDiv.append(this.#loginInput);
      this.containerDiv.append(this.#passwordLabel);
      this.containerDiv.append(this.#passwordInput);
      this.containerDiv.append(this.#registerButton);
      this.containerDiv.append(this.#loginButton);
      this.containerDiv.append(this.#revivePasswordButton);
      
      this.#registerButton.addEventListener('click', this.#registerClicked.bind(this));
      
      this.#initialized = true;
    }
    this.containerDiv.style.display = 'flex';
  }
  
  hideView() {
    super.hideView();
  }


  addLoginListener(simpleEventListener) {
    this.#loginListeners.push(simpleEventListener);
  }

  addRegisterListener(simpleEventListener) {
    this.#registerListeners.push(simpleEventListener);
  }

  addRecoverPasswordListener(simpleEventListener) {
    this.#recoverPasswordListeners.push(simpleEventListener);
  }
  
  addRestoreSessionListener(listener) {
    this.#restoreSessionListeners.push(listener);
  }

  setServers(servers) {
    this.#servers = servers;
    for (let n = 0; n < servers.length; n++) {
      const serverInfo = servers[n];
      this.#serverSelect.add(new Option(`${serverInfo.name} (${serverInfo.locale})`, serverInfo.address));
      if (this.settings.lastHost && this.settings.lastHost.length > 0) {
        if (serverInfo.address == settings.lastHost) {
          this.#serverSelect.value = serverInfo.address;
        }
      } else {
        if (serverInfo.locale == this.messageSource.getMessage(StringConstants.LANGUAGE_CODE)){
          this.#serverSelect.value = serverInfo.address;
        }
      }
    }
  }

  #registerClicked(event) {
    try {
      const selectedIndex = this.#serverSelect.selectedIndex;
      const host = this.#servers[selectedIndex].address;
      for (let simpleEvent of this.#registerListeners) {
        simpleEvent(this, host);
      }
    } catch (ex) {
      console.error("RegisterClicked processing error %o.", ex);
      this.trayIcon.showTrayMessage(
      this.messageSource.getMessage(StringConstants.ERROR, null, null)
          + ": " + ex.toString(), MessageType.ERROR);
    }
  }
}