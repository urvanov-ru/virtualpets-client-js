// localization
import StringConstants from '../localization/StringConstants.js';

// trayIcon
import MessageType from '../trayicon/MessageType.js';

// view
import BaseHtmlView from './BaseHtmlView.js';

// resources
import ResourceManager from '../resources/ResourceManager.js';

export default class UserPetsView extends BaseHtmlView{
  #southDiv;
  #createPetButton;
  #refreshPetsListButton;
  #deletePetButton;
  #enterButton;
  #names = [];
  #petsType = [];

  
  #autoSelectPetName;
  resourceManager;
  connectionInfo;
  settings;
  trayIcon;
  messageSource;
  createPetFrame;
  chatFrame;
  
  #initialized = false;
  
  #refreshListeners = [];
  #createListeners = [];
  #selectListeners = [];
  
  constructor() {
    super();
  }
  
  showView() {
    super.showView();
    if (!this.#initialized) {
      this.#southDiv = document.createElement('div');
      this.#createPetButton = document.createElement('button');
      this.#refreshPetsListButton = document.createElement('button');
      this.#deletePetButton = document.createElement('button');
      this.#enterButton = document.createElement('button');
      
      this.#southDiv.style.display = 'flex';
      this.#southDiv.style.flexDirection = 'row';
      
      const createPetImageEl = document.createElement('div');
      const refreshPetsListImageEl = document.createElement('div');
      const deletePetImageEl = document.createElement('div');
      const enterImageEl = document.createElement('div');

      createPetImageEl.append(this.resourceManager.getImage(ResourceManager.IMAGE_ICON_CREATE));
      refreshPetsListImageEl.append(this.resourceManager.getImage(ResourceManager.IMAGE_ICON_REFRESH));
      deletePetImageEl.append(this.resourceManager.getImage(ResourceManager.IMAGE_ICON_DELETE));
      enterImageEl.append(this.resourceManager.getImage(ResourceManager.IMAGE_ICON_ACCEPT));

      this.#createPetButton.append(createPetImageEl);
      this.#refreshPetsListButton.append(refreshPetsListImageEl);
      this.#deletePetButton.append(deletePetImageEl);
      this.#enterButton.append(enterImageEl);
      
      this.#createPetButton.append(this.messageSource.getMessage(StringConstants.CREATE_PET));
      this.#refreshPetsListButton.append(this.messageSource.getMessage(StringConstants.REFRESH));
      this.#deletePetButton.append(this.messageSource.getMessage(StringConstants.DELETE_PET));
      this.#enterButton.append(this.messageSource.getMessage(StringConstants.LOGIN));
      
      this.#southDiv.append(this.#createPetButton);
      this.#southDiv.append(this.#refreshPetsListButton);
      this.#southDiv.append(this.#deletePetButton);
      this.#southDiv.append(this.#enterButton);
      
      this.containerDiv.append(this.#southDiv);
      
      this.#initialized = true;
    }
    this.containerDiv.style.display = 'flex';
  }
  
  hideView() {
    super.hideView();
  }
  
  addRefreshListener(listener) {
    this.#refreshListeners.push(listener);
  }
  
  addCreateListener(listener) {
    this.#createListeners.push(listener);
  }
  
  addSelectListener(listener) {
    this.#selectListeners.push(listener);
  }
  
  setPetsInfo(petsInfo) {
  }

}